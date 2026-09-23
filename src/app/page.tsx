'use client';

import React, { useState } from 'react';
import { Search, GraduationCap, Users, Building2, ShieldCheck, CheckCircle2, ArrowRight, MapPin, Menu, X, Sparkles, ArrowUpRight, Globe, Share2, MessageCircle} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample data for featured opportunities
  const featuredOpportunities = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Google',
      location: 'Bengaluru, India',
      workType: 'Remote',
      jobType: 'Full-time',
      payType: 'Paid',
      logoBg: 'bg-red-50 text-red-600 border-red-100',
      logoInitial: 'G',
    },
    {
      id: 2,
      title: 'Product Design Intern',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      workType: 'Hybrid',
      jobType: 'Full-time',
      payType: 'Paid',
      logoBg: 'bg-blue-50 text-blue-600 border-blue-100',
      logoInitial: 'M',
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Amazon',
      location: 'Bengaluru, India',
      workType: 'On-site',
      jobType: 'Full-time',
      payType: 'Paid',
      logoBg: 'bg-amber-50 text-amber-600 border-amber-100',
      logoInitial: 'A',
    },
  ];

  // Company marquee list
  const companyLogos = [
    'Google',
    'Microsoft',
    'Amazon',
    'TCS',
    'Deloitte',
    'IBM',
    'Infosys',
    'Accenture',
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              InternNova
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">
              Home
            </a>
            <a href="/about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Internships
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Alumni Referrals
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Companies
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button aria-label="Search" className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1">
              <Search className="w-5 h-5" />
            </button>
            <a
              href="/auth/login"
              className="px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:shadow-lg"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-100 mt-3 space-y-3">
            <a href="#" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">About</a>
            <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">Internships</a>
            <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">Alumni Referrals</a>
            <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">Companies</a>
            <div className="pt-2 flex flex-col gap-2">
              <a href="/auth/login" className="w-full text-center py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl">Login</a>
              <a href="/auth/register" className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl">Register</a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Text Block */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-600 font-semibold text-xs rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" /> Your Future, Our Mission
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
            Discover Internships, <br />
            Connect with Alumni, <br />
            Build Your <span className="text-blue-600">Future</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
            InternNova is a university-powered platform that connects students, alumni, and companies to create opportunities, mentorships, and a stronger career network.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-lg">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search internships, companies, or skills..."
              className="w-full text-sm focus:outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 shadow-md shadow-blue-500/20">
              Search
            </button>
          </div>

          {/* Popular Search Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-700">Popular:</span>
            {['Software Engineering', 'Data Science', 'Product Management', 'Marketing'].map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-md cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Feature Graphic Cards */}
        <div className="lg:col-span-6 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 p-4">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Students collaborating"
              className="rounded-2xl object-cover w-full h-[380px] sm:h-[440px]"
            />
          </div>

          {/* Floating Card - Students */}
          <div className="absolute top-6 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px]">
            <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Students</p>
              <p className="text-[11px] text-slate-500 leading-tight">Find internships & start your career</p>
            </div>
          </div>

          {/* Floating Card - Alumni */}
          <div className="absolute top-12 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[230px]">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-xl shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Alumni</p>
              <p className="text-[11px] text-slate-500 leading-tight">Share referrals & mentor future talent</p>
            </div>
          </div>

          {/* Floating Card - Companies */}
          <div className="absolute -bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px]">
            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">For Companies</p>
              <p className="text-[11px] text-slate-500 leading-tight">Hire top talent & build your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGO TRUST BAR */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-sm font-bold tracking-wider text-slate-800 uppercase">
            Trusted by Leading Companies
          </p>
          <p className="text-xs text-slate-500 -mt-4">
            Top companies trust InternNova to find and hire the best talent.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-2 opacity-70 grayscale hover:grayscale-0 transition-all">
            {companyLogos.map((logo) => (
              <span key={logo} className="text-xl sm:text-2xl font-black tracking-tight text-slate-700">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            How It Works
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Whether you are a student, alumni, or company, InternNova makes it easy to find opportunities and build connections.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {[
            {
              step: '1',
              title: 'Create Your Profile',
              desc: 'Sign up and tell us about your goals, skills, and interests.',
              icon: Users,
              iconColor: 'bg-purple-100 text-purple-600',
            },
            {
              step: '2',
              title: 'Explore Opportunities',
              desc: 'Browse internships, referral posts, and top companies.',
              icon: Search,
              iconColor: 'bg-blue-100 text-blue-600',
            },
            {
              step: '3',
              title: 'Apply or Refer',
              desc: 'Apply directly or get referred by university alumni.',
              icon: GraduationCap,
              iconColor: 'bg-emerald-100 text-emerald-600',
            },
            {
              step: '4',
              title: 'Grow Your Career',
              desc: 'Get hired, gain experience, and build your professional network.',
              icon: Sparkles,
              iconColor: 'bg-amber-100 text-amber-600',
            },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative text-center space-y-3">
              <div className={`w-12 h-12 ${item.iconColor} rounded-2xl flex items-center justify-center mx-auto`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{item.step}. {item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DESIGNED FOR EVERYONE (ROLES) */}
      <section className="bg-blue-50/50 py-20 border-y border-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Why InternNova
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Designed for Everyone
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              We bring together students, alumni, and companies on one platform to create more opportunities and stronger careers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">For Students</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Find relevant internships</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Upload and manage resumes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Track applications & interviews</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Connect directly with alumni</li>
              </ul>
            </div>

            {/* Alumni Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">For Alumni</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Post referral opportunities</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Mentor current students</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Expand your network</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Give back to your university</li>
              </ul>
            </div>

            {/* HR / Company Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">For Companies</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Post internships & jobs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Review qualified candidates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Schedule interview meetings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Build your talent pipeline</li>
              </ul>
            </div>

            {/* Admin Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">For Admins</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Manage users & roles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Verify company profiles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Global platform monitoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Ensure secure operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED INTERNSHIPS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Featured Opportunities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Top Opportunities This Week
            </h2>
            <p className="text-slate-500 text-sm">
              Explore recent internship listings posted directly by companies and verified alumni.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-md shadow-blue-500/20 shrink-0"
          >
            View All Internships <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredOpportunities.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${item.logoBg}`}>
                    {item.logoInitial}
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md">
                    {item.workType}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500">{item.company}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded">
                    {item.jobType}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2 py-0.5 rounded">
                    {item.payType}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1">
                Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Join InternNova
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Your Next Opportunity is Just a Click Away
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Sign up today and be part of a growing community of students, alumni, and companies working together for a better tomorrow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href="/auth/register"
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs px-6 py-3 rounded-xl text-center transition-colors shadow-md"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-6 py-3 rounded-xl border border-slate-700 text-center transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">InternNova</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Connecting university students with high-impact internships, alumni referral networks, and top corporate employers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Internships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alumni Referrals</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">For Users</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Student</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alumni</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HR / Company</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Support</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 InternNova. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" aria-label="Website" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Share" className="hover:text-white transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" aria-label="Community" className="hover:text-white transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}