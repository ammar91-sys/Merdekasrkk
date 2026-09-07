import React, { useState } from 'react';
import { Search, Users, MapPin, Building, Trophy, Filter, CheckCircle } from 'lucide-react';
import { EmployeeRegistration } from '../types';

interface AttendeeDirectoryProps {
  registrations: EmployeeRegistration[];
  capacity: number;
}

export const AttendeeDirectory: React.FC<AttendeeDirectoryProps> = ({
  registrations,
  capacity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Filter registrations
  const filteredAttendees = registrations.filter((reg) => {
    const matchesSearch =
      reg.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === 'all' || reg.officeLocation === selectedLocation;

    const matchesDept = selectedDept === 'all' || reg.department === selectedDept;

    return matchesSearch && matchesLocation && matchesDept;
  });

  const uniqueDepartments = Array.from(new Set(registrations.map((r) => r.department)));

  return (
    <section id="directory" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
              Team Roster & Attendance
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              See Who is Celebrating With You
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
              Connect with colleagues across business units and plan your traditional outfits together!
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-800 shrink-0 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider">
              <strong className="text-yellow-400 font-black text-sm">{registrations.length}</strong> Registered Colleagues
            </span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-8">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by colleague name, ID, or department..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white shadow-2xs"
            />
          </div>

          {/* Location Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white shadow-2xs"
            >
              <option value="all">All Office Hubs</option>
              <option value="Kuala Lumpur HQ">Kuala Lumpur HQ</option>
              <option value="Penang Branch">Penang Branch</option>
              <option value="Johor Bahru Office">Johor Bahru Office</option>
              <option value="Singapore Regional">Singapore Regional</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white shadow-2xs"
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAttendees.length > 0 ? (
            filteredAttendees.map((attendee) => (
              <div
                key={attendee.id}
                className="p-5 rounded-[1.5rem] bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-blue-900 text-yellow-400 font-black text-xs flex items-center justify-center shadow-2xs">
                      {attendee.employeeName.charAt(0)}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      attendee.attendanceType === 'in-person'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {attendee.attendanceType === 'in-person' ? 'In-Person' : 'Virtual'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {attendee.employeeName}
                  </h4>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {attendee.department}
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{attendee.officeLocation}</span>
                  </div>
                </div>

                {/* Contests or Plus-One Tag */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {attendee.activities.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {attendee.activities.slice(0, 2).map((act, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 text-slate-900 rounded-md border border-yellow-200 truncate max-w-full"
                          title={act}
                        >
                          🏆 {act.split(' ')[0]}
                        </span>
                      ))}
                      {attendee.activities.length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-500 font-bold">
                          +{attendee.activities.length - 2} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Cheering attendee</span>
                  )}

                  {attendee.plusOne && (
                    <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Bringing +1 Companion</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-[2rem] border border-dashed border-slate-300">
              <p className="text-sm font-semibold text-slate-700">No colleagues match your current search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('all');
                  setSelectedDept('all');
                }}
                className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-yellow-300 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
