'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  GraduationCap, 
  Users, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Globe, 
  Share2, 
  MessageCircle, 
  Loader2 
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Backend Dynamic Data State
  const [featuredOpportunities, setFeaturedOpportunities] = useState<any[]>([]);
  const [companiesList, setCompaniesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch Internships & Companies from Backend API
  useEffect(() => {
    fetch('http://localhost:3000/internship')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch internships');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const activeInternships = data.filter((item) => item.isActive !== false);
          setFeaturedOpportunities(activeInternships.slice(0, 3));

          const uniqueCompanies = Array.from(
            new Set(
              data
                .map((item) => item.company?.name)
                .filter((name): name is string => Boolean(name))
            )
          );
          setCompaniesList(uniqueCompanies);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error:', err);
        setLoading(false);
      });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/internships?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/internships');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. VIBRANT NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push('/')}>
            <div className="p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/20">
              <Image 
                src="/logo.png" 
                alt="InternNova Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 object-contain brightness-200"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-pink-200 bg-clip-text text-transparent">
                InternNova
              </span>
              <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase mt-0.5">
                Connect
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#" className="text-indigo-400 font-bold border-b-2 border-indigo-500 pb-1">
              Home
            </a>
            <a href="/about" className="hover:text-indigo-400 transition-colors">
              About
            </a>
            <a href="/internships" className="hover:text-indigo-400 transition-colors">
              Internships
            </a>
            <a href="/dashboard" className="hover:text-indigo-400 transition-colors">
              Alumni Referrals
            </a>
          </div>

          {/* Action Buttons (Fixed to point to auth routes) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/auth/login"
              className="px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-2xl transition-all border border-slate-700/60"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-800/80 mt-3 space-y-3">
            <a href="#" className="block px-3 py-2 rounded-xl bg-slate-800 text-indigo-400 font-bold text-xs">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-xs font-medium">About</a>
            <a href="/internships" className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-xs font-medium">Internships</a>
            <a href="/dashboard" className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-xs font-medium">Alumni Referrals</a>
            <div className="pt-2 flex flex-col gap-2">
              <a href="/auth/login" className="w-full text-center py-2.5 text-xs font-bold text-slate-300 border border-slate-700 rounded-2xl">Login</a>
              <a href="/auth/register" className="w-full text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl">Register</a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. COLORFUL HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center overflow-hidden">
        
        {/* Glow Background Elements */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Hero Text Block */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-full border border-indigo-800/50 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Launch Your Career Today
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
            Discover Opportunities, <br />
            Connect with Alumni, <br />
            Build Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Future</span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
            InternNova is an advanced university placement network. Search verified internships, connect with alumni for referrals, and land your dream job with top employers.
          </p>

          {/* Dynamic Search Box */}
          <form onSubmit={handleSearchSubmit} className="bg-slate-800/90 p-2 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2 max-w-lg backdrop-blur-md">
            <Search className="w-4 h-4 text-indigo-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by position, company, or skills..."
              className="w-full text-xs focus:outline-none bg-transparent text-white placeholder:text-slate-500 font-medium"
            />
            <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 shrink-0">
              Search
            </button>
          </form>

          {/* Popular Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span className="font-bold text-slate-300">Popular:</span>
            {['Software Engineer', 'React / Next.js', 'NestJS', 'UI/UX'].map((tag) => (
              <span
                key={tag}
                onClick={() => router.push(`/internships?query=${encodeURIComponent(tag)}`)}
                className="bg-slate-800/60 hover:bg-slate-800 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-xl cursor-pointer transition-colors text-[11px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Feature Graphic Cards */}
        <div className="lg:col-span-6 relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-gradient-to-b from-slate-800 to-slate-900 p-3">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Students collaborating"
              className="rounded-2xl object-cover w-full h-[380px] sm:h-[440px] opacity-80"
            />
          </div>

          {/* Floating Glassmorphism Cards */}
          <div className="absolute top-6 -left-4 sm:-left-6 z-20 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-indigo-500/30 flex items-center gap-3 max-w-[230px]">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-2.5 rounded-xl shrink-0 shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white">For Students</p>
              <p className="text-[10px] text-slate-400 font-medium">Apply & track applications</p>
            </div>
          </div>

          <div className="absolute top-12 -right-2 sm:-right-4 z-20 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-purple-500/30 flex items-center gap-3 max-w-[240px]">
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white p-2.5 rounded-xl shrink-0 shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white">For Alumni</p>
              <p className="text-[10px] text-slate-400 font-medium">Provide verified referrals</p>
            </div>
          </div>

          <div className="absolute -bottom-6 right-6 z-20 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 max-w-[230px]">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 text-white p-2.5 rounded-xl shrink-0 shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white">For Companies</p>
              <p className="text-[10px] text-slate-400 font-medium">Post jobs & hire top talent</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC TRUST BAR */}
      <section className="bg-slate-950/80 py-10 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="text-xs font-extrabold tracking-widest text-indigo-400 uppercase">
            Trusted by Top Industry Employers & Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2">
            {companiesList.length > 0 ? (
              companiesList.map((companyName, idx) => (
                <span key={idx} className="text-lg sm:text-xl font-black tracking-tight text-slate-300 hover:text-white transition-colors cursor-pointer">
                  {companyName}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 font-medium">Loading partner network...</span>
            )}
          </div>
        </div>
      </section>

      {/* 4. COLORFUL ROLE CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            Tailored Experience
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Designed for Everyone
          </h2>
          <p className="text-slate-400 text-xs max-w-lg mx-auto font-medium">
            Dedicated portals and tools for students, university alumni, company recruiters, and system managers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Student */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4 hover:border-indigo-500/50 transition-all">
            <div className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 w-12 h-12 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">For Students</h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Browse active internships</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Manage multiple resumes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Real-time application tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Alumni referral requests</li>
            </ul>
          </div>

          {/* Alumni */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-6 rounded-3xl border border-purple-500/20 shadow-xl space-y-4 hover:border-purple-500/50 transition-all">
            <div className="bg-purple-500/10 text-purple-400 border border-purple-500/30 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">For Alumni</h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Google OAuth login check</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Post referral opportunities</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Verify student profiles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Network with university peers</li>
            </ul>
          </div>

          {/* Companies */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-6 rounded-3xl border border-emerald-500/20 shadow-xl space-y-4 hover:border-emerald-500/50 transition-all">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">For Companies</h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Post internship positions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Review applicant CVs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Referral vs Direct filtering</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Hire qualified candidates</li>
            </ul>
          </div>

          {/* Admin */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4 hover:border-amber-500/50 transition-all">
            <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 w-12 h-12 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">For Admins</h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Role & permission control</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Verify employer accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Security & data auditing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Analytics & monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FEATURED OPPORTUNITIES FROM BACKEND */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Live Feed
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Featured Opportunities This Week
            </h2>
            <p className="text-slate-400 text-xs font-medium">
              Real-time internship listings synced directly from company partners.
            </p>
          </div>
          <a
            href="/internships"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 shrink-0"
          >
            View All Internships <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredOpportunities.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {item.company?.name?.charAt(0) || 'C'}
                    </div>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold px-3 py-1 rounded-xl">
                      {item.isActive !== false ? 'Active Position' : 'Closed'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs font-bold text-indigo-400 mt-0.5">{item.company?.name || 'Company Name'}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {item.location || 'Dhaka, Bangladesh'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description || 'No detailed description available for this position.'}
                  </p>
                </div>

                <a
                  href={`/internships/${item.id}`}
                  className="w-full mt-6 bg-slate-900 hover:bg-slate-950 text-white border border-slate-700 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  View Details <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. VIBRANT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-indigo-500/30 relative overflow-hidden">
          
          <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-300">
              Join InternNova
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Your Next Opportunity is Just a Click Away
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Create your account today and unlock a network of student opportunities, verified alumni referrals, and top employers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 relative z-10">
            <a
              href="/auth/register"
              className="bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs px-6 py-3.5 rounded-2xl text-center transition-all shadow-lg hover:scale-105"
            >
              Get Started Now
            </a>
            <a
              href="/about"
              className="bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-xs px-6 py-3.5 rounded-2xl border border-slate-700 text-center transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="InternNova Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 object-contain brightness-200"
              />
              <span className="text-lg font-bold text-white">InternNova</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-medium">
              Connecting university students with high-impact internships, alumni referral networks, and top corporate employers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="/internships" className="hover:text-indigo-400 transition-colors">Internships</a></li>
              <li><a href="/dashboard" className="hover:text-indigo-400 transition-colors">Alumni Referrals</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">For Users</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="/auth/login" className="hover:text-indigo-400 transition-colors">Student</a></li>
              <li><a href="/auth/login" className="hover:text-indigo-400 transition-colors">Alumni</a></li>
              <li><a href="/auth/login" className="hover:text-indigo-400 transition-colors">HR / Company</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Support</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© 2026 InternNova. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" aria-label="Website" className="hover:text-indigo-400 transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Share" className="hover:text-indigo-400 transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" aria-label="Community" className="hover:text-indigo-400 transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
