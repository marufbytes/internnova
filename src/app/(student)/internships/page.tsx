'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Bookmark, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2 
} from 'lucide-react';
import ApplyModal from '../ApplyModal';

export default function BrowseInternshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedType, setSelectedType] = useState('All types');
  const [selectedSort, setSelectedSort] = useState('Newest first');

  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  
  // Track Applied Internships (Persistent state)
  const [appliedInternshipIds, setAppliedInternshipIds] = useState<number[]>([2]); 

  const internships = [
    {
      id: 1,
      title: 'Product Design Intern',
      company: { name: 'Pathao' },
      logo: 'P',
      location: 'Dhaka · Hybrid',
      duration: '3 months',
      applicants: '24 applicants',
      skills: ['Figma', 'Research', 'Prototyping'],
      deadline: '28 May 2025',
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: { name: 'bKash' },
      logo: 'b',
      location: 'Dhaka · On-site',
      duration: '6 months',
      applicants: '42 applicants',
      skills: ['React', 'TypeScript', 'REST API'],
      deadline: '31 May 2025',
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      company: { name: 'Chaldal' },
      logo: 'C',
      location: 'Remote',
      duration: '4 months',
      applicants: '18 applicants',
      skills: ['SQL', 'Python', 'Excel'],
      deadline: '02 Jun 2025',
    },
    {
      id: 4,
      title: 'Brand & Communications Intern',
      company: { name: 'Grameenphone' },
      logo: 'G',
      location: 'Dhaka · Hybrid',
      duration: '3 months',
      applicants: '31 applicants',
      skills: ['Content', 'Strategy', 'Analytics'],
      deadline: '05 Jun 2025',
    },
  ];

  const handleApplySuccess = (appliedId: number) => {
    setAppliedInternshipIds((prev) => [...prev, appliedId]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Browse internships
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Discover opportunities that match your skills and ambitions.
        </p>
      </div>

      {/* Filter Header */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company, or skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-12 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-800 placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded bg-white font-mono">
            ⌘K
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-36">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option>All locations</option>
              <option>Dhaka</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:w-32">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option>All types</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:w-36">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Deadline soon</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
        <p>
          <span className="font-bold text-slate-900">48 internships</span> available
        </p>
        <p>Updated today</p>
      </div>

      {/* Internship Cards */}
      <div className="space-y-4">
        {internships.map((item) => {
          const isApplied = appliedInternshipIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center font-bold text-slate-800 text-base shrink-0">
                  {item.logo}
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 hover:text-slate-700 cursor-pointer transition-colors">
                        {item.title}
                      </h3>
                      <button className="text-slate-400 hover:text-slate-700 transition-colors md:hidden">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.company.name}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.applicants}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-slate-50 text-slate-600 border border-slate-200/60 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-3 shrink-0">
                <div className="hidden md:flex items-center gap-2 self-end">
                  <button className="text-slate-400 hover:text-slate-700 transition-colors p-1">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-left md:text-right space-y-0.5">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    APPLICATION DEADLINE
                  </p>
                  <p className="text-xs font-bold text-slate-900">{item.deadline}</p>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <Link
                    href={`/internships/${item.id}`}
                    className="flex-1 md:flex-none text-center bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    View details
                  </Link>

                  {isApplied ? (
                    <span className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-xl text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedInternship(item)}
                      className="flex-1 md:flex-none bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                    >
                      Apply now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Modal Component */}
      {selectedInternship && (
        <ApplyModal
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
}
