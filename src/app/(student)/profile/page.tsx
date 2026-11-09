'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit3, Loader2, AlertCircle, FileText, Upload, Trash2 } from 'lucide-react';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Form states for uploading a new resume
  const [title, setTitle] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Fetch Real Student Profile from /users/me and Resumes from /resume
  useEffect(() => {
    fetchProfileAndResumes();
  }, []);

  const fetchProfileAndResumes = async () => {
    try {
      // 1. Fetch Profile
      const profileRes = await fetch('http://localhost:3000/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      if (!profileRes.ok) throw new Error('Failed to fetch profile information.');
      const profileData = await profileRes.json();
      setProfile(profileData);

      // 2. Fetch Resumes directly from backend without fake fallback
      const resumeRes = await fetch('http://localhost:3000/resume', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      if (resumeRes.ok) {
        const resumeData = await resumeRes.json();
        if (Array.isArray(resumeData)) {
          // Strictly filter only current student's resumes if studentId is present
          const userResumes = resumeData.filter(
            (r: any) => r.studentId === profileData.id || r.student?.id === profileData.id
          );
          setResumes(userResumes);
        } else {
          setResumes([]);
        }
      } else {
        setResumes([]);
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  // Handle Resume Upload Submit
  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !profile) {
      alert('Please provide a resume title, select a PDF file, and ensure profile is loaded.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('skills', skillsInput);
    formData.append('studentId', profile.id);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/resume', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload resume.');

      setTitle('');
      setSkillsInput('');
      setFile(null);
      await fetchProfileAndResumes();
      alert('Resume uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Resume Delete
  const handleDeleteResume = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const res = await fetch(`http://localhost:3000/resume/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to delete resume.');
      
      // Update UI state immediately and re-sync
      setResumes((prev) => prev.filter((r) => r.id !== id));
      await fetchProfileAndResumes();
    } catch (err: any) {
      alert(err.message || 'Failed to delete resume.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-sm">
        <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
        <p className="text-xs font-semibold text-slate-600">{error || 'Profile not found.'}</p>
      </div>
    );
  }

  // Pure dynamic name & initials
  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || profile.email || 'User';
  const nameInitials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // Pure dynamic skills array from backend
  const userSkills: string[] = Array.isArray(profile.skills) ? profile.skills : [];

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Student profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep your academic and professional information up to date.
          </p>
        </div>

        <button
          onClick={() => alert('Edit profile functionality coming soon!')}
          className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4" />
          Edit profile
        </button>
      </div>

      {/* 2. Top Profile Hero Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
            {nameInitials}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {fullName}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {profile.department || 'N/A'} {profile.university ? `· ${profile.university}` : ''}
            </p>

            {/* Skill Tags from Real Backend Data */}
            {userSkills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {userSkills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-slate-50 text-slate-600 border border-slate-200/80 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="self-start md:self-center bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          Profile Active
        </div>
      </div>

      {/* 3. Personal Information (Full Width) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Personal information
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email
            </span>
            <span className="font-bold text-slate-900">{profile.email || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> Phone
            </span>
            <span className="font-bold text-slate-900">{profile.phone || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Location
            </span>
            <span className="font-bold text-slate-900">{profile.location || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Role / Account Type
            </span>
            <span className="font-bold text-slate-900 uppercase">{profile.role || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* 4. Resume & CV Management Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            My Resumes / CVs
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload PDF resumes to use when applying for internships.
          </p>
        </div>

        {/* Dynamic Resumes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.length > 0 ? (
            resumes.map((resItem) => (
              <div key={resItem.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{resItem.title}</h4>
                    <p className="text-[10px] text-slate-500">
                      Skills: {Array.isArray(resItem.skills) ? resItem.skills.join(', ') : resItem.skills || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`http://localhost:3000/${resItem.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteResume(resItem.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 col-span-2 py-6 text-center border border-dashed border-slate-200 rounded-2xl">
              No resumes uploaded yet. Upload your PDF resume below.
            </p>
          )}
        </div>

        {/* Upload New Resume Form */}
        <form onSubmit={handleResumeUpload} className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload New Resume (PDF)</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Resume Title</label>
              <input
                type="text"
                placeholder="e.g. Full-stack Developer Resume"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, TypeScript"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">PDF File (Max 5MB)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-950 file:text-white hover:file:bg-slate-800 cursor-pointer"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
