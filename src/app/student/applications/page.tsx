'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Building2, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

const applications = [
  { id: '1', title: 'Frontend Developer Intern', company: 'TechCorp Ltd.', appliedDate: 'Sep 18, 2026', status: 'In Review', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  { id: '2', title: 'UI/UX Designer Apprentice', company: 'Creative Studio', appliedDate: 'Sep 10, 2026', status: 'Shortlisted', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertCircle },
  { id: '3', title: 'Data Analyst Trainee', company: 'Analytics Flow', appliedDate: 'Aug 28, 2026', status: 'Selected', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  { id: '4', title: 'Software Engineer Intern', company: 'NextGen Solutions', appliedDate: 'Aug 15, 2026', status: 'Rejected', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', icon: XCircle }
];

const filterTabs = ['All', 'In Review', 'Shortlisted', 'Selected', 'Rejected'];

export default function StudentApplicationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredApps = applications.filter(
    app => activeTab === 'All' || app.status === activeTab
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
            <p className="text-slate-500 text-sm mt-0.5">Track and manage your submitted internship applications.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div className="space-y-3">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80">
                <p className="text-sm text-slate-500">No applications found under "{activeTab}".</p>
              </div>
            ) : (
              filteredApps.map(app => {
                const StatusIcon = app.icon;
                return (
                  <div key={app.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{app.title}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1 ${app.badgeColor}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {app.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {app.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Applied on {app.appliedDate}
                        </span>
                      </div>
                    </div>

                    <button className="self-start sm:self-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition flex items-center gap-1.5">
                      View Details <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}