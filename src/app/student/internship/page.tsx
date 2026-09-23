'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Search, MapPin, ArrowUpRight, Bookmark, Building2 } from 'lucide-react';

const internshipCategories = ['All Internships', 'Software', 'Design', 'Data & AI', 'Marketing', 'Finance'];

const allInternships = [
  { id: '1', title: 'Frontend Developer Intern', company: 'TechCorp Ltd.', location: 'Remote', type: 'Full-time Intern', stipend: '$800 - $1,200/mo', tags: ['React', 'Next.js', 'Tailwind'], category: 'Software' },
  { id: '2', title: 'UI/UX Designer Apprentice', company: 'Creative Studio', location: 'Hybrid', type: 'Part-time Intern', stipend: '$500 - $800/mo', tags: ['Figma', 'Prototyping'], category: 'Design' },
  { id: '3', title: 'Data Analyst Trainee', company: 'Analytics Flow', location: 'On-site', type: 'Full-time Intern', stipend: '$900 - $1,400/mo', tags: ['Python', 'SQL', 'Tableau'], category: 'Data & AI' },
  { id: '4', title: 'Marketing Assistant Intern', company: 'Growthify', location: 'Remote', type: 'Part-time Intern', stipend: '$400 - $700/mo', tags: ['SEO', 'Content', 'Socials'], category: 'Marketing' },
  { id: '5', title: 'Backend Software Intern', company: 'DevLabs', location: 'Remote', type: 'Full-time Intern', stipend: '$1,000 - $1,500/mo', tags: ['Node.js', 'PostgreSQL'], category: 'Software' }
];

export default function StudentInternshipsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Internships');

  const filteredInternships = allInternships.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.company.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All Internships' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Explore Internships</h1>
            <p className="text-slate-500 text-sm mt-0.5">Find training roles and internships tailored for your career path.</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title or company..." className="w-full py-2.5 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {internshipCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Showing {filteredInternships.length} internships</p>

            {filteredInternships.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80">
                <p className="text-sm text-slate-500">No internships found matching your search.</p>
              </div>
            ) : (
              filteredInternships.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 cursor-pointer">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-medium text-slate-700"><Building2 className="w-3.5 h-3.5 text-slate-400" />{item.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{item.location}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium text-[11px]">{item.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-medium rounded-md border border-blue-100">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-between items-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className="text-sm font-bold text-slate-900">{item.stipend}</span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"><Bookmark className="w-4 h-4" /></button>
                      <button className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-medium transition flex items-center gap-1.5 shadow-sm">
                        Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}