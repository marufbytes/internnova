'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample interface for backend integration
interface Application {
  id: number;
  title: string;
  company: string;
  logo: string;
  appliedDate: string;
  status: string;
  statusStyle: string;
  interview: string;
}

export default function ApplicationsPage() {
  // Backend State simulation (Ekhane future-e API/Query param lagaben)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [currentPage, setCurrentPage] = useState(1);

  // Example state coming from Backend API response
  const totalResults = 12;
  const totalPages = 4;
  const itemsPerPage = 3;

  // Static Data (Real implementation-e API call response hbe)
  const applications: Application[] = [
    {
      id: 1,
      title: 'Product Design Intern',
      company: 'Pathao',
      logo: 'P',
      appliedDate: '18 May 2025',
      status: 'Interview Scheduled',
      statusStyle: 'bg-blue-50 text-blue-600 border-blue-100',
      interview: '22 May, 10:30 AM',
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'bKash',
      logo: 'b',
      appliedDate: '16 May 2025',
      status: 'Under Review',
      statusStyle: 'bg-amber-50 text-amber-700 border-amber-100',
      interview: '—',
    },
    {
      id: 3,
      title: 'Business Analyst Intern',
      company: 'ShopUp',
      logo: 'S',
      appliedDate: '12 May 2025',
      status: 'Pending',
      statusStyle: 'bg-amber-50/80 text-amber-600 border-amber-100',
      interview: '—',
    },
  ];

  // Handler functions trigger Backend API / Router push
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Fetch Page 1 from backend for new search query
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Fetch Page 1 from backend for new status filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Fetch specific page from backend
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all your internship applications.
          </p>
        </div>

        {/* Total Applications Count Badge */}
        <div className="bg-white border border-slate-200/80 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm self-start sm:self-auto">
          <span className="text-2xl font-extrabold text-slate-900">{totalResults}</span>
          <span className="text-xs font-semibold text-slate-500">Total applications</span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-12 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-800 placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded bg-white font-mono">
            ⌘K
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-48">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full appearance-none bg-slate-50 border border-slate-200/80 px-3 py-2 pr-8 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option>All statuses</option>
            <option>Interview Scheduled</option>
            <option>Under Review</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Applications Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                <th className="py-4 px-6">INTERNSHIP</th>
                <th className="py-4 px-6">APPLIED</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6">INTERVIEW</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Internship Info & Logo */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center font-bold text-slate-800 text-sm shrink-0">
                          {app.logo}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{app.title}</p>
                          <p className="text-[11px] text-slate-500">{app.company}</p>
                        </div>
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-6 text-slate-500 font-medium">{app.appliedDate}</td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${app.statusStyle}`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Interview Info */}
                    <td className="py-4 px-6 text-slate-500 font-medium">{app.interview}</td>

                    {/* Action Link */}
                    <td className="py-4 px-6 text-right">
                      <button className="text-slate-700 hover:text-slate-950 font-semibold transition-colors">
                        View details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pure UI Pagination Controls */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 text-xs">
          <p className="text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * itemsPerPage, totalResults)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{totalResults}</span> results
          </p>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200/80 rounded-xl bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-xl font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200/80 rounded-xl bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
