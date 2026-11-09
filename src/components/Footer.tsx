import React from 'react';
import Link from 'next/link';

import { GraduationCap, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
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
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Internships</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Alumni Referrals</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">For Users</p>
          <ul className="space-y-2 text-xs">
            <li><Link href="#" className="hover:text-white transition-colors">Student</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Alumni</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">HR / Company</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Admin</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Support</p>
          <ul className="space-y-2 text-xs">
            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
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
  );
}