'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Forgot Password States
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [resetErr, setResetErr] = useState<string | null>(null);

  // Real Backend Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // withCredentials is enabled on the api instance (needed for HTTP-only cookies from backend)
      const { data } = await api.post('/auth/login', { email, password });

      // Check exact user role returned from backend database response
      const userRole = data.user?.role;

      if (userRole === 'HR') {
        router.push('/hr-dashboard');
      } else if (userRole === 'ALUMNI') {
        router.push('/alumni-dashboard');
      } else if (userRole === 'ADMIN') {
        router.push('/admin-dashboard');
      } else {
        router.push('/dashboard'); // Student Dashboard default
      }
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || (err.response ? 'Invalid email or password.' : err.message) || 'Connection error. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetErr(null);
    setResetMsg(null);
    setResetLoading(true);

    try {
      await api.post('/auth/reset-password', { email: resetEmail, newPassword });

      setResetMsg('Password updated successfully! You can now log in.');
      setNewPassword('');
      setResetEmail('');
      setTimeout(() => setShowForgot(false), 1800);
    } catch (err: any) {
      setResetErr(err.response?.data?.message || (err.response ? 'Failed to reset password. Please check your email.' : err.message) || 'Server error. Reset Password feature may not be configured in backend.');
    } finally {
      setResetLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgot(false);
    setResetErr(null);
    setResetMsg(null);
    setResetEmail('');
    setNewPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 justify-between font-sans">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200/80 py-4 px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-700 bg-transparent text-blue-700">
            <GraduationCap className="h-5 w-5 text-blue-700" />
          </div>
          <span className="text-xl font-extrabold text-blue-800 tracking-tight">
            InternNova <span className="block text-[10px] font-semibold text-slate-400">Connect</span>
          </span>
        </Link>

        <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-2">
          
          {/* Form Left Side */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                <Link href="/auth/login" className="flex-1 py-2.5 text-center text-xs font-bold bg-white text-slate-900 rounded-xl shadow-sm">
                  Log In
                </Link>
                <Link href="/auth/register" className="flex-1 py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-all">
                  Register
                </Link>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Log In to Your Account</h2>

              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@university.edu"
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                    <button 
                      type="button" 
                      onClick={() => { setShowForgot(true); setResetErr(null); setResetMsg(null); }}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 pr-11 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all"
                  />
                    <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-blue-700 focus:outline-none focus-visible:text-blue-700">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>
            </div>

            <div className="text-center mt-8 text-xs text-slate-500 font-medium">
              <p>
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-slate-900 font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Graphical Right Side */}
          <div className="hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-white/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-black mb-3 tracking-tight">
              Welcome Back!<br />Join Our Network
            </h3>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-medium">
              Access exclusive internship opportunities, connect with verified alumni mentors, and manage your career journey seamlessly.
            </p>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Reset Password</h3>
              <button 
                type="button" 
                onClick={closeForgotModal}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {resetErr && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {resetErr}
              </div>
            )}
            {resetMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {resetMsg}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={closeForgotModal}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={resetLoading}
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {resetLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Set New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightweight Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500 font-medium">
        © 2026 InternNova. All rights reserved.
      </footer>
    </div>
  );
}
