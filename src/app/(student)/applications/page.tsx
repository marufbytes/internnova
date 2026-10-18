'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Real Data from Backend
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    fetch('http://localhost:3000/application/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Status Styling Helper
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50/80 text-amber-600 border-amber-100';
      case 'REVIEWED':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'INTERVIEW':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'ACCEPTED':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  // Filter logic
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.internship?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internship?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All statuses' ||
      app.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalResults = filteredApps.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all your internship applications.
          </p>
        </div>

        {/* Total Applications Count Badge */}
        <div className="bg-white border border-slate-200/80 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm self-start sm:self-auto hover:border-slate-300 transition-all">
          <span className="text-2xl font-extrabold text-slate-900">{totalResults}</span>
          <span className="text-xs font-semibold text-slate-500">Total applications</span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-12 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-48">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
          >
            <option>All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Applications Table Section with Hover Effects */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                <th className="py-4 px-6">INTERNSHIP</th>
                <th className="py-4 px-6">APPLIED</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6">INTERVIEW</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedApps.length > 0 ? (
                paginatedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Internship Info & Logo */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center font-bold text-slate-800 text-sm shrink-0 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-colors">
                          {app.internship?.company?.name?.charAt(0) || 'I'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {app.internship?.title}
                          </p>
                          <p className="text-[11px] text-slate-500">{app.internship?.company?.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Interview Info */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {app.interviews && app.interviews.length > 0 ? 'Scheduled' : '—'}
                    </td>

                    {/* Action Link */}
                    <td className="py-4 px-6 text-right">
                      <button className="text-slate-600 hover:text-slate-950 font-semibold transition-colors">
                        View details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination Controls */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 text-xs">
          <p className="text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{totalResults > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * itemsPerPage, totalResults)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{totalResults}</span> results
          </p>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200/80 rounded-xl bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200/80 rounded-xl bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
