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
import api from '@/lib/api';

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
    api.get('/internship')
      .then((res) => res.data)
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. VIBRANT NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push('/')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-blue-700 bg-transparent text-blue-700">
              <GraduationCap className="h-6 w-6 text-blue-700" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-blue-800">
                InternNova
              </span>
              <span className="text-[10px] font-bold text-blue-700 tracking-wider uppercase mt-0.5">
                Connect
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#" className="text-blue-800 font-bold border-b-2 border-blue-700 pb-1">
              Home
            </a>
            <a href="/about" className="hover:text-blue-800 transition-colors">
              About
            </a>
            <a href="/internships" className="hover:text-blue-800 transition-colors">
              Internships
            </a>
            <a href="/dashboard" className="hover:text-blue-800 transition-colors">
              Alumni Referrals
            </a>
          </div>

          {/* Action Buttons (Fixed to point to auth routes) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/auth/login"
              className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-blue-50 rounded-2xl transition-all border border-slate-200"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-2xl shadow-sm transition-all"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-200 mt-3 space-y-3">
            <a href="#" className="block px-3 py-2 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium">About</a>
            <a href="/internships" className="block px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium">Internships</a>
            <a href="/dashboard" className="block px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium">Alumni Referrals</a>
            <div className="pt-2 flex flex-col gap-2">
              <a href="/auth/login" className="w-full text-center py-2.5 text-xs font-bold text-slate-700 border border-slate-200 rounded-2xl">Login</a>
              <a href="/auth/register" className="w-full text-center py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-2xl">Register</a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. COLORFUL HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center overflow-hidden">
        
        {/* Glow Background Elements */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />

        {/* Left Hero Text Block */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 font-bold text-xs rounded-full border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-700" /> Launch Your Career Today
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.15] tracking-tight">
            Discover Opportunities, <br />
            Connect with Alumni, <br />
            Build Your <span className="text-blue-700">Future</span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
            InternNova is an advanced university placement network. Search verified internships, connect with alumni for referrals, and land your dream job with top employers.
          </p>

          {/* Dynamic Search Box */}
          <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl shadow-md border border-slate-200 flex items-center gap-2 max-w-lg">
            <Search className="w-4 h-4 text-blue-700 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by position, company, or skills..."
              className="w-full text-xs focus:outline-none bg-transparent text-slate-800 placeholder:text-slate-600 font-medium"
            />
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0">
              Search
            </button>
          </form>

          {/* Popular Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
            <span className="font-bold text-slate-700">Popular:</span>
            {['Software Engineer', 'React / Next.js', 'NestJS', 'UI/UX'].map((tag) => (
              <span
                key={tag}
                onClick={() => router.push(`/internships?query=${encodeURIComponent(tag)}`)}
                className="bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-xl cursor-pointer transition-colors text-[11px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Feature Graphic Cards */}
        <div className="lg:col-span-6 relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-3">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Students collaborating"
              className="rounded-2xl object-cover w-full h-[380px] sm:h-[440px]"
            />
          </div>

          {/* Floating Glassmorphism Cards */}
          <div className="absolute top-6 -left-4 sm:-left-6 z-20 bg-white p-4 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-3 max-w-[230px]">
            <div className="bg-blue-700 text-white p-2.5 rounded-xl shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Students</p>
              <p className="text-[10px] text-slate-500 font-medium">Apply & track applications</p>
            </div>
          </div>

          <div className="absolute top-12 -right-2 sm:-right-4 z-20 bg-white p-4 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-3 max-w-[240px]">
            <div className="bg-blue-700 text-white p-2.5 rounded-xl shrink-0 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Alumni</p>
              <p className="text-[10px] text-slate-500 font-medium">Provide verified referrals</p>
            </div>
          </div>

          <div className="absolute -bottom-6 right-6 z-20 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3 max-w-[230px]">
            <div className="bg-blue-700 text-white p-2.5 rounded-xl shrink-0 shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Companies</p>
              <p className="text-[10px] text-slate-500 font-medium">Post jobs & hire top talent</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC TRUST BAR */}
      <section className="bg-blue-50 py-10 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            Trusted by Top Industry Employers & Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2">
            {companiesList.length > 0 ? (
              companiesList.map((companyName, idx) => (
                <span key={idx} className="text-lg sm:text-xl font-bold tracking-tight text-slate-700 hover:text-blue-800 transition-colors cursor-pointer">
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
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800">
            Tailored Experience
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Designed for Everyone
          </h2>
          <p className="text-slate-600 text-xs max-w-lg mx-auto font-medium">
            Dedicated portals and tools for students, university alumni, company recruiters, and system managers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Student */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
            <div className="bg-blue-50 text-blue-800 border border-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">For Students</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Browse active internships</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Manage multiple resumes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Real-time application tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Alumni referral requests</li>
            </ul>
          </div>

          {/* Alumni */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
            <div className="bg-blue-50 text-blue-800 border border-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">For Alumni</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Google OAuth login check</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Post referral opportunities</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Verify student profiles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Network with university peers</li>
            </ul>
          </div>

          {/* Companies */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
            <div className="bg-blue-50 text-blue-800 border border-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">For Companies</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Post internship positions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Review applicant CVs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Referral vs Direct filtering</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Hire qualified candidates</li>
            </ul>
          </div>

          {/* Admin */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
            <div className="bg-blue-50 text-blue-800 border border-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">For Admins</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Role & permission control</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Verify employer accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Security & data auditing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" /> Analytics & monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FEATURED OPPORTUNITIES FROM BACKEND */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800">
              Live Feed
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Featured Opportunities This Week
            </h2>
            <p className="text-slate-600 text-xs font-medium">
              Real-time internship listings synced directly from company partners.
            </p>
          </div>
          <a
            href="/internships"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-sm shrink-0"
          >
            View All Internships <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredOpportunities.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {item.company?.name?.charAt(0) || 'C'}
                    </div>
                    <span className="text-[11px] bg-blue-50 text-blue-800 border border-blue-100 font-bold px-3 py-1 rounded-xl">
                      {item.isActive !== false ? 'Active Position' : 'Closed'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs font-bold text-blue-800 mt-0.5">{item.company?.name || 'Company Name'}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-700" /> {item.location || 'Dhaka, Bangladesh'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description || 'No detailed description available for this position.'}
                  </p>
                </div>

                <a
                  href={`/internships/${item.id}`}
                  className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white border border-slate-200 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  View Details <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. VIBRANT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-blue-50 text-slate-900 p-8 sm:p-12 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100 relative overflow-hidden">
          
          <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-blue-800">
              Join InternNova
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Your Next Opportunity is Just a Click Away
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Create your account today and unlock a network of student opportunities, verified alumni referrals, and top employers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 relative z-10">
            <a
              href="/auth/register"
              className="bg-blue-700 text-white hover:bg-blue-800 font-extrabold text-xs px-6 py-3.5 rounded-2xl text-center transition-all shadow-lg hover:scale-105"
            >
              Get Started Now
            </a>
            <a
              href="/about"
              className="bg-white hover:bg-blue-50 text-blue-800 font-bold text-xs px-6 py-3.5 rounded-2xl border border-blue-200 text-center transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white text-slate-600 py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.jpg" 
                alt="InternNova Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 object-contain "
              />
              <span className="text-lg font-bold text-blue-800">InternNova</span>
            </div>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed font-medium">
              Connecting university students with high-impact internships, alumni referral networks, and top corporate employers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-blue-800 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-blue-800 transition-colors">About</a></li>
              <li><a href="/internships" className="hover:text-blue-800 transition-colors">Internships</a></li>
              <li><a href="/dashboard" className="hover:text-blue-800 transition-colors">Alumni Referrals</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">For Users</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="/auth/login" className="hover:text-blue-800 transition-colors">Student</a></li>
              <li><a href="/auth/login" className="hover:text-blue-800 transition-colors">Alumni</a></li>
              <li><a href="/auth/login" className="hover:text-blue-800 transition-colors">HR / Company</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Support</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-blue-800 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-800 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-800 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© 2026 InternNova. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="#" aria-label="Website" className="hover:text-blue-800 transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Share" className="hover:text-blue-800 transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" aria-label="Community" className="hover:text-blue-800 transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
