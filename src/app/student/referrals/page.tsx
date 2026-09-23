'use client';

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { UserCheck, Building2, ShieldCheck } from 'lucide-react';

const mockReferrals = [
  { id: 101, companyName: 'TechCorp Ltd.', position: 'Frontend Intern', referredBy: 'Sarah Jenkins (Senior HR)', status: 'ACCEPTED', date: '2026-09-12' },
  { id: 102, companyName: 'Analytics Flow', position: 'Data Science Intern', referredBy: 'Alex Rivera (Staff Engineer)', status: 'PENDING', date: '2026-09-19' }
];

export default function StudentReferralsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />
      <div className="flex flex-1">
        <Sidebar role="STUDENT" />
        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alumni Referrals</h1>
            <p className="text-slate-500 text-sm mt-0.5">Track referral requests backed by verified alumni.</p>
          </div>

          <div className="space-y-3">
            {mockReferrals.map((ref) => (
              <div key={ref.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{ref.position}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      ref.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {ref.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700"><Building2 className="w-3.5 h-3.5 text-slate-400" />{ref.companyName}</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-slate-400" />Referred by: {ref.referredBy}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> Verified Referral
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}