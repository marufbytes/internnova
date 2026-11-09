'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Bookmark, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2,
  Loader2,
  Building2
} from 'lucide-react';
import ApplyModal from '../ApplyModal';

export default function BrowseInternshipsPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedType, setSelectedType] = useState('All types');
  const [selectedSort, setSelectedSort] = useState('Newest first');

  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  
  // Track Applied Internships from backend applications
  const [appliedInternshipIds, setAppliedInternshipIds] = useState<number[]>([]); 

  // 1. Fetch Real Internships and Applications using HTTP-Only Cookies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Internships List
        const internshipsRes = await fetch('http://localhost:3000/internship', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        
        if (internshipsRes.ok) {
          const internshipsData = await internshipsRes.json();
          if (Array.isArray(internshipsData)) {
            setInternships(internshipsData);
          }
        }

        // Fetch user's existing applications to mark "Applied" badges accurately
        const applicationsRes = await fetch('http://localhost:3000/application/my', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (applicationsRes.ok) {
          const applicationsData = await applicationsRes.json();
          if (Array.isArray(applicationsData)) {
            const appliedIds = applicationsData
              .map((app: any) => app.internship?.id || app.internshipId)
              .filter(Boolean);
            setAppliedInternshipIds(appliedIds);
          }
        }
      } catch (err) {
        console.error('Failed to load internships or user applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplySuccess = (appliedId: number) => {
    setAppliedInternshipIds((prev) => [...prev, appliedId]);
  };

  // 2. Real Backend Data Filtering & Sorting
  const filteredInternships = internships
    .filter((item) => {
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(item.skills) && item.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesLocation = 
        selectedLocation === 'All locations' || 
        item.location?.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesType = 
        selectedType === 'All types' || 
        item.type?.toLowerCase().includes(selectedType.toLowerCase());

      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      if (selectedSort === 'Newest first') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (selectedSort === 'Oldest first') {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (selectedSort === 'Deadline soon') {
        return new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime();
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

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
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-12 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-36">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
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
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
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
              className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2.5 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
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
          <span className="font-bold text-slate-900">{filteredInternships.length} internships</span> available
        </p>
        <p>Updated live</p>
      </div>

      {/* Internship Cards */}
      <div className="space-y-4">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => {
            const isApplied = appliedInternshipIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center font-bold text-slate-800 text-base shrink-0 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-colors">
                    {item.company?.name?.charAt(0) || <Building2 className="w-5 h-5" />}
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors">
                          {item.title}
                        </h3>
                        <button className="text-slate-400 hover:text-slate-700 transition-colors md:hidden">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.company?.name || 'Company Name'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location || 'Remote / Hybrid'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.duration || 'Flexible'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.applications?.length || item.applicantsCount || 0} Applicants</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    {Array.isArray(item.skills) && item.skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {item.skills.map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="bg-slate-50 text-slate-600 border border-slate-200/60 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
                    <p className="text-xs font-bold text-slate-900">
                      {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Open'}
                    </p>
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
          })
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">No internships found matching your criteria.</p>
          </div>
        )}
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
