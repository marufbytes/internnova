'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { GraduationCap, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/api';

const regSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").max(32, "Max 32 characters"),
  role: z.enum(["STUDENT", "ALUMNI", "HR", "ADMIN"]),
});

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    password: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus({ loading: true, msg: "" });

    const parsed = regSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach(i => { if (i.path[0]) fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      setStatus({ loading: false, msg: "" });
      return;
    }

    try {
      await api.post('/auth/register', form);

      setStatus({ loading: false, msg: "Account created successfully! Redirecting to login..." });
      
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);

    } catch (err: any) {
      setStatus({ loading: false, msg: err.response?.data?.message || (err.response ? 'Registration failed.' : err.message) || 'Server connection error.' });
    }
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

      {/* Main Form Container */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side: Form */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                <Link href="/auth/login" className="flex-1 py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-all">
                  Log In
                </Link>
                <Link href="/auth/register" className="flex-1 py-2.5 text-center text-xs font-bold bg-white text-slate-900 rounded-xl shadow-sm">
                  Register
                </Link>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Create an Account</h2>
              
              {status.msg && (
                <div className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${status.msg.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"}`}>
                  {status.msg.includes("success") ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={form.firstName} 
                      onChange={e => set("firstName", e.target.value)} 
                      placeholder="First Name" 
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all" 
                    />
                    {errors.firstName && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={form.lastName} 
                      onChange={e => set("lastName", e.target.value)} 
                      placeholder="Last Name" 
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all" 
                    />
                    {errors.lastName && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">User Role</label>
                  <select 
                    value={form.role} 
                    onChange={e => set("role", e.target.value)} 
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all cursor-pointer"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="ALUMNI">Alumni</option>
                    <option value="HR">HR / Employer</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={form.email} 
                    onChange={e => set("email", e.target.value)} 
                    placeholder="name@example.com" 
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all" 
                  />
                  {errors.email && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    value={form.phone} 
                    onChange={e => set("phone", e.target.value)} 
                    placeholder="+8801XXXXXXXXX" 
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all" 
                  />
                  {errors.phone && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
                  <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={form.password} 
                    onChange={e => set("password", e.target.value)} 
                    placeholder="At least 8 chars with letter & number" 
                    className="w-full px-4 py-2.5 pr-11 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white text-slate-800 font-medium transition-all" 
                  />
                    <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-blue-700 focus:outline-none focus-visible:text-blue-700">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.password}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={status.loading} 
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                </button>
              </form>
            </div>

            <div className="text-center mt-6 text-xs text-slate-500 font-medium">
              <p>Already have an account? <Link href="/auth/login" className="text-slate-900 font-bold hover:underline">Log In</Link></p>
            </div>
          </div>

          {/* Right Side: Visual Hero */}
          <div className="hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-white/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-black mb-3 tracking-tight">Start Your Journey<br />With Us!</h3>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-medium">
              Create your profile to unlock career opportunities, connect with top employers, and grow your professional network.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500 font-medium">
        © 2026 InternNova. All rights reserved.
      </footer>
    </div>
  );
}
