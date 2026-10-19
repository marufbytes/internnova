'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  FileText, 
  UserCheck, 
  Send, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

interface Resume {
  id: number;
  title: string;
  fileUrl?: string;
  url?: string;
  updatedAt?: string;
}

interface Props {
  internship: { id: number; title: string; company: { name: string } };
  onClose: () => void;
  onSuccess: (internshipId: number) => void;
}

export default function ApplyModal({ internship, onClose, onSuccess }: Props) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [type, setType] = useState<'direct' | 'referral'>('direct');
  
  // Alumni Email for backend referral lookup and verification
  const [alumniGoogleEmail, setAlumniGoogleEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // Fetch Real Student Resumes from Backend Database
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const profileRes = await fetch('http://localhost:3000/users/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        
        let currentUserId = null;
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          currentUserId = profileData.id;
        }

        const res = await fetch('http://localhost:3000/resume', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const myResumes = data.filter((r: any) => {
              const rStudentId = r.studentId || r.student?.id;
              return currentUserId ? rStudentId === currentUserId : true;
            });

            const validResumes = myResumes.length > 0 ? myResumes : data;

            if (validResumes.length > 0) {
              const formattedResumes = validResumes.map((r: any) => ({
                ...r,
                url: r.url || (r.fileUrl ? `http://localhost:3000/${r.fileUrl}` : '#')
              }));
              setResumes(formattedResumes);
              setSelectedResumeId(String(formattedResumes[0].id));
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch resumes for application:', err);
        setResumes([]);
      }
    };

    fetchResumes();
  }, []);

  const selectedResume = resumes.find((r) => String(r.id) === selectedResumeId);

  const handleSubmit = async () => {
    // 1. Resume Check
    if (!selectedResumeId) {
      setError('Please select a resume before submitting.');
      return;
    }

    // 2. Referral Alumni Email Check
    if (type === 'referral' && !alumniGoogleEmail.trim()) {
      setError('Referral application-এ Alumni-এর Google email দিতে হবে!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        internshipId: Number(internship.id),
        resumeId: Number(selectedResumeId),
        type,
        ...(type === 'referral'
          ? {
              alumniEmail: alumniGoogleEmail.trim(), // Passing email to backend
            }
          : {}),
      };

      const res = await fetch('http://localhost:3000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to submit application.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      onSuccess(internship.id);
      
      setTimeout(() => {
        onClose();
        router.refresh();
      }, 1500);

    } catch (err) {
      setError('Connection error. Please check backend connection.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-100 relative overflow-hidden transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pr-6 space-y-1">
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            Apply for {internship.title}
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            {internship.company?.name} · Internship
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Review your application details before submitting.
          </p>
        </div>

        {/* Success View */}
        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-500 max-w-xs">
              Your application has been registered as pending alumni approval. Track status in your dashboard.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">

            {/* 1. Resume Selection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  1. Select Resume <span className="text-rose-500">*</span>
                </label>
                {selectedResume && selectedResume.url && selectedResume.url !== '#' && (
                  <a
                    href={selectedResume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Preview CV <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {resumes.length === 0 ? (
                <p className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100 font-medium">
                  No resume found from database. Please upload a CV first from your profile.
                </p>
              ) : (
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} {r.updatedAt ? `· Updated ${new Date(r.updatedAt).toLocaleDateString()}` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* 2. Application Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                2. Application Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                    type === 'direct'
                      ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                      : 'border-slate-200/80 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="appType"
                    value="direct"
                    checked={type === 'direct'}
                    onChange={() => setType('direct')}
                    className="accent-slate-900"
                  />
                  <span className="text-xs">Direct Application</span>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                    type === 'referral'
                      ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                      : 'border-slate-200/80 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="appType"
                    value="referral"
                    checked={type === 'referral'}
                    onChange={() => setType('referral')}
                    className="accent-slate-900"
                  />
                  <span className="text-xs">Referral</span>
                </label>
              </div>
            </div>

            {/* 3. Alumni Google Email Verification Field */}
            {type === 'referral' && (
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
                <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  3. Alumni Google Email Verification
                </p>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Alumni Google Account Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={alumniGoogleEmail}
                    onChange={(e) => setAlumniGoogleEmail(e.target.value)}
                    placeholder="alumni.email@gmail.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <p className="text-[10px] text-slate-400">
                  An approval request will be sent to this alumni email for verification.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || resumes.length === 0}
                className="flex-1 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
