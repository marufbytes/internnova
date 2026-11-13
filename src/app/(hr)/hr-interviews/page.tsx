'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Interview {
  id: number;
  scheduledDate: string;
  meetingLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  candidateName?: string;
  internshipTitle?: string;
  application?: {
    id: number;
    student?: {
      firstName?: string;
      lastName?: string;
      email?: string;
    };
    internship?: {
      title?: string;
    };
  };
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled'] as const;

export default function InterviewsContent() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('All');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [editDate, setEditDate] = useState<string>('');
  const [editLink, setEditLink] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchInterviews = async (statusFilter: string) => {
    setLoading(true);
    try {
      let filterParam = statusFilter.toLowerCase();
      if (statusFilter === 'Upcoming') filterParam = 'scheduled';

      const url = statusFilter === 'All' 
        ? '/interviews/company' 
        : `/interviews/company?status=${filterParam}`;

      const response = await api.get(url);
      const result = response.data;

      if (Array.isArray(result)) {
        setInterviews(result);
      } else {
        setInterviews([]);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews(activeTab);
  }, [activeTab]);

  const handleEditClick = (interview: Interview) => {
    setEditingInterview(interview);
    const dateObj = new Date(interview.scheduledDate);
    if (!isNaN(dateObj.getTime())) {
      const tzOffset = dateObj.getTimezoneOffset() * 60000;
      setEditDate(new Date(dateObj.getTime() - tzOffset).toISOString().slice(0, 16));
    } else {
      setEditDate('');
    }
    setEditLink(interview.meetingLink || '');
  };

  const handleSaveEdit = async () => {
    if (!editingInterview) return;
    setIsUpdating(true);

    try {
      const payload: { meetingLink: string; scheduledDate?: string } = {
        meetingLink: editLink,
      };

      if (editDate) {
        payload.scheduledDate = new Date(editDate).toISOString();
      }

      await api.patch(`/interviews/${editingInterview.id}`, payload);

      setEditingInterview(null);
      showToast('Interview updated successfully!', 'success');
      fetchInterviews(activeTab);
    } catch (error: any) {
      if (error.response) {
        showToast(`Failed to update: ${error.response.data?.message || 'Server Error'}`, 'error');
      } else {
        showToast('Error connecting to backend server', 'error');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelClick = async (id: number) => {
    try {
      await api.patch(`/interviews/${id}`, { status: 'cancelled' });

      showToast('Interview cancelled successfully', 'success');
      fetchInterviews(activeTab);
    } catch (error: any) {
      if (error.response) {
        showToast(`Failed to cancel: ${error.response.data?.message || 'Server Error'}`, 'error');
      } else {
        showToast('Error connecting to backend server', 'error');
      }
    }
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'scheduled') {
      return (
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 inline-block">
          Interview
        </span>
      );
    }
    if (status === 'completed') {
      return (
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 inline-block">
          Accepted
        </span>
      );
    }
    return (
      <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-500 border border-rose-100 inline-block">
        Cancelled
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white p-6 font-sans">
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-600 border-emerald-500 text-white'
              : 'bg-rose-600 border-rose-500 text-white'
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Interviews</h1>
        <p className="text-xs text-gray-500 mt-1">Manage and monitor candidate interview schedules.</p>
      </div>

      <div className="mb-6 flex items-center">
        <div className="inline-flex bg-gray-100/80 p-1 rounded-xl gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-xs font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm font-bold text-gray-900 bg-white">
                <th className="py-4 px-6 font-bold">Applicant</th>
                <th className="py-4 px-6 font-bold">Internship</th>
                <th className="py-4 px-6 font-bold">Scheduled Date</th>
                <th className="py-4 px-6 font-bold">Meeting Link</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Loading interviews...
                  </td>
                </tr>
              ) : interviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No interviews found.
                  </td>
                </tr>
              ) : (
                interviews.map((item) => {
                  const dateObj = new Date(item.scheduledDate);
                  const isValidDate = !isNaN(dateObj.getTime());
                  const formattedDate = isValidDate
                    ? dateObj.toISOString().split('T')[0]
                    : item.scheduledDate;

                  const candidateName =
                    item.candidateName ||
                    (item.application?.student
                      ? `${item.application.student.firstName || ''} ${item.application.student.lastName || ''}`.trim()
                      : null) ||
                    `Candidate #${item.id}`;

                  const internshipTitle =
                    item.internshipTitle ||
                    item.application?.internship?.title ||
                    'N/A';

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {candidateName}
                      </td>

                      <td className="py-4 px-6 font-normal text-gray-700">
                        {internshipTitle}
                      </td>

                      <td className="py-4 px-6 text-gray-400 font-normal">
                        {formattedDate}
                      </td>

                      <td className="py-4 px-6">
                        {item.meetingLink ? (
                          <a
                            href={
                              item.meetingLink.startsWith('http')
                                ? item.meetingLink
                                : `https://${item.meetingLink}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline max-w-[150px] truncate block"
                          >
                            {item.meetingLink}
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        {renderStatusBadge(item.status)}
                      </td>

                      <td className="py-4 px-6 text-right">
                        {item.status === 'scheduled' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleCancelClick(item.id)}
                              className="px-4 py-1.5 border border-rose-200 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50/50 hover:bg-rose-100 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-400 bg-gray-50 cursor-not-allowed"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingInterview && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Edit Interview Schedule</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Meeting Link
                </label>
                <input
                  type="text"
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  placeholder="meet.google.com/..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingInterview(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-semibold hover:bg-blue-800 transition disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

