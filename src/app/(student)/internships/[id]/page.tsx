'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Briefcase, 
  CheckCircle2, 
  Bookmark, 
  Building2, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import ApplyModal from '../../ApplyModal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InternshipDetailsPage({ params }: PageProps) {
  // Safe unwrap using React.use() for Next.js App Router
  const resolvedParams = use(params);
  const internshipId = resolvedParams.id;

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isApplied, setIsApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Fetch Single Internship & Check Application Status from DB
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    // 1. Fetch Internship Details from Backend DB
    fetch(`http://localhost:3000/internship/${internshipId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Internship not found.');
        return res.json();
      })
      .then((data) => {
        setInternship(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong.');
        setLoading(false);
      });

    // 2. Check if student already applied
    if (token) {
      fetch('http://localhost:3000/application/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const hasApplied = data.some((app) => app.internship?.id === Number(internshipId));
            setIsApplied(hasApplied);
          }
        })
        .catch(() => {});
    }
  }, [internshipId]);

  const handleApplySuccess = () => {
    setIsApplied(true);
    setShowApplyModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="space-y-6">
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Internships
        </Link>
        <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-sm">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-xs font-semibold text-slate-600">{error || 'Internship not found.'}</p>
        </div>
      </div>
    );
  }

  const company = internship.company;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/internships"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Internships
      </Link>

      {/* Hero Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm">
            {company?.name?.charAt(0) || <Building2 className="w-7 h-7" />}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                internship.isActive !== false 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' 
                  : 'bg-rose-50 text-rose-700 border border-rose-200/80'
              }`}>
                {internship.isActive !== false ? 'Active Position' : 'Closed'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {internship.title}
            </h1>

            <p className="text-sm font-semibold text-slate-500">
              {company?.name || 'Company Name'}
            </p>
          </div>
        </div>

        {/* Action Button (Single Apply / Applied Button in the entire page) */}
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 rounded-2xl transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>

          {isApplied ? (
            <span className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-2xl text-xs font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Applied Successfully
            </span>
          ) : (
            <button
              onClick={() => setShowApplyModal(true)}
              className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-xs font-semibold transition-colors shadow-sm"
            >
              Apply now
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Dynamic Description & Requirements from DB */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              About the role
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line">
              {internship.description || 'No detailed description provided for this position.'}
            </p>
          </div>

          {internship.requirements && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Requirements & Qualifications
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                {internship.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar: Company Overview */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Company Overview
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> Company
                </span>
                <span className="font-bold text-slate-900">{company?.name || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Status
                </span>
                <span className="font-bold text-slate-900">
                  {internship.isActive !== false ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Apply Modal Component */}
      {showApplyModal && (
        <ApplyModal
          internship={internship}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
}
