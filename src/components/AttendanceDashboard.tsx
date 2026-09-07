import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Plus,
  Trash2,
  Eye,
  ArrowLeft,
  RefreshCw,
  Building,
  Shirt,
  Utensils,
  MapPin,
  Sparkles,
  UserCheck,
  Check,
  X,
  ChevronDown
} from 'lucide-react';
import { EmployeeRegistration } from '../types';
import { DEPARTMENTS, EVENT_DETAILS } from '../data/eventData';
import { attendanceDb } from '../services/attendanceDb';

interface AttendanceDashboardProps {
  attendees: EmployeeRegistration[];
  onViewPass: (attendee: EmployeeRegistration) => void;
  onBackToHome: () => void;
}

export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({
  attendees,
  onViewPass,
  onBackToHome,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedMode, setSelectedMode] = useState<'ALL' | 'in-person' | 'virtual'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'Confirmed' | 'Checked-In'>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'dept-asc'>('date-desc');
  
  // Quick Add Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffId, setNewStaffId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDepartment, setNewDepartment] = useState(DEPARTMENTS[0]);
  const [newLocation, setNewLocation] = useState<EmployeeRegistration['officeLocation']>('Johor Bahru Office');
  const [newMode, setNewMode] = useState<'in-person' | 'virtual'>('in-person');
  const [newShirt, setNewShirt] = useState<EmployeeRegistration['shirtSize']>('L');
  const [newDiet, setNewDiet] = useState<EmployeeRegistration['dietaryPreference']>('halal');
  const [newPlusOne, setNewPlusOne] = useState(false);
  const [newPlusOneName, setNewPlusOneName] = useState('');
  const [addError, setAddError] = useState('');

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Statistics calculation
  const totalCount = attendees.length;
  const inPersonCount = attendees.filter((a) => a.attendanceType === 'in-person').length;
  const virtualCount = attendees.filter((a) => a.attendanceType === 'virtual').length;
  const checkedInCount = attendees.filter((a) => a.attendanceStatus === 'Checked-In').length;
  const totalPlusOnes = attendees.filter((a) => a.plusOne).length;
  const totalVenueHeadcount = inPersonCount + attendees.filter((a) => a.attendanceType === 'in-person' && a.plusOne).length;

  // Department distribution
  const deptBreakdown = useMemo(() => {
    const map: { [dept: string]: number } = {};
    attendees.forEach((a) => {
      map[a.department] = (map[a.department] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [attendees]);

  // Shirt size distribution
  const shirtBreakdown = useMemo(() => {
    const map: { [size: string]: number } = { XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0 };
    attendees.forEach((a) => {
      if (a.shirtSize in map) {
        map[a.shirtSize]++;
      }
    });
    return map;
  }, [attendees]);

  // Dietary distribution
  const dietaryBreakdown = useMemo(() => {
    const map: { [diet: string]: number } = {};
    attendees.forEach((a) => {
      map[a.dietaryPreference] = (map[a.dietaryPreference] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [attendees]);

  // Filtering & Sorting
  const filteredAttendees = useMemo(() => {
    return attendees
      .filter((a) => {
        const query = searchTerm.toLowerCase();
        const matchesSearch =
          !query ||
          a.employeeName.toLowerCase().includes(query) ||
          a.employeeId.toLowerCase().includes(query) ||
          a.ticketNumber.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query) ||
          a.department.toLowerCase().includes(query);

        const matchesDept = selectedDept === 'ALL' || a.department === selectedDept;
        const matchesMode = selectedMode === 'ALL' || a.attendanceType === selectedMode;
        const currentStatus = a.attendanceStatus || 'Confirmed';
        const matchesStatus = selectedStatus === 'ALL' || currentStatus === selectedStatus;

        return matchesSearch && matchesDept && matchesMode && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
        }
        if (sortBy === 'date-asc') {
          return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
        }
        if (sortBy === 'name-asc') {
          return a.employeeName.localeCompare(b.employeeName);
        }
        if (sortBy === 'dept-asc') {
          return a.department.localeCompare(b.department);
        }
        return 0;
      });
  }, [attendees, searchTerm, selectedDept, selectedMode, selectedStatus, sortBy]);

  const handleToggleCheckIn = async (id: string) => {
    await attendanceDb.toggleCheckIn(id);
  };

  const handleDeleteAttendee = async (id: string) => {
    await attendanceDb.deleteAttendance(id);
    setDeleteConfirmId(null);
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) {
      setAddError('Please provide employee full name.');
      return;
    }
    if (!newStaffId.trim()) {
      setAddError('Please provide employee ID.');
      return;
    }

    const randomSeq = Math.floor(100 + Math.random() * 900);
    const tables = [
      'Table 1 (Bunga Raya)',
      'Table 2 (Jalur Gemilang)',
      'Table 3 (Wau Bulan)',
      'Table 4 (Harimau Malaya)',
      'Table 5 (Gasing Emas)',
      'Table 6 (Keris Warisan)',
      'Table 7 (Tanjak Diraja)',
    ];
    const assignedTable =
      newMode === 'in-person' ? tables[Math.floor(Math.random() * tables.length)] : 'Virtual Teams Lounge';

    const newRecord: EmployeeRegistration = {
      id: `db-reg-${Date.now()}`,
      employeeName: newStaffName.trim(),
      employeeId: newStaffId.trim().toUpperCase(),
      email: newEmail.trim() || `${newStaffId.toLowerCase()}@uthm.edu.my`,
      department: newDepartment,
      officeLocation: newLocation,
      attendanceType: newMode,
      dietaryPreference: newDiet,
      shirtSize: newShirt,
      activities: ['Busana Warisan Best Dressed'],
      plusOne: newPlusOne,
      plusOneName: newPlusOne ? newPlusOneName.trim() : undefined,
      registrationDate: new Date().toISOString().split('T')[0],
      ticketNumber: `UTHM-MDK-${randomSeq}`,
      tableNumber: assignedTable,
      attendanceStatus: 'Confirmed',
      confirmedAt: new Date().toISOString(),
    };

    await attendanceDb.saveAttendance(newRecord);
    setShowAddModal(false);
    setNewStaffName('');
    setNewStaffId('');
    setNewEmail('');
    setNewPlusOne(false);
    setNewPlusOneName('');
    setAddError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      {/* Top Banner Navigation & Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing Page</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Database Live & Synced
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight flex items-center gap-2.5">
            <span>Attendance Database Dashboard</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-900 text-yellow-400 font-extrabold uppercase tracking-wider">
              UTHM 2026
            </span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Real-time tracking of confirmed staff attendees, seating tables, check-in statuses, and dietary/t-shirt allocations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            id="dashboard-add-attendee-btn"
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4 text-yellow-400" />
            <span>Add Attendance Record</span>
          </button>

          <button
            onClick={() => attendanceDb.exportCSV()}
            id="dashboard-export-csv-btn"
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all flex items-center gap-2"
            title="Download CSV for Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => attendanceDb.exportJSON()}
            id="dashboard-export-json-btn"
            className="px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5"
            title="Export JSON Backup"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset database back to initial sample staff list? Any custom added records will be restored.')) {
                attendanceDb.resetToDefault();
              }
            }}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all text-xs"
            title="Reset Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Confirmed Attendees */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Confirmed</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              {totalCount}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">/ {EVENT_DETAILS.capacity} cap</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-blue-800 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalCount / EVENT_DETAILS.capacity) * 100))}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {Math.round((totalCount / EVENT_DETAILS.capacity) * 100)}% capacity allocated
            </p>
          </div>
        </div>

        {/* Card 2: On-Site Check-In Status */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Checked In On-Site</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-display">
              {checkedInCount}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">arrived</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {totalCount - checkedInCount} confirmed awaiting arrival
            </p>
          </div>
        </div>

        {/* Card 3: Attendance Mode */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Mode</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-black text-slate-900 font-display">{inPersonCount}</div>
              <span className="text-xs font-bold text-slate-500">In-Person</span>
              <span className="text-slate-300">|</span>
              <div className="text-2xl font-bold text-slate-600">{virtualCount}</div>
              <span className="text-xs text-slate-400">Virtual</span>
            </div>
            <div className="flex gap-1.5 w-full mt-3">
              <div
                className="bg-amber-500 h-2 rounded-l-full"
                style={{ width: `${totalCount > 0 ? (inPersonCount / totalCount) * 100 : 50}%` }}
                title="In-Person"
              ></div>
              <div
                className="bg-blue-400 h-2 rounded-r-full"
                style={{ width: `${totalCount > 0 ? (virtualCount / totalCount) * 100 : 50}%` }}
                title="Virtual"
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {totalCount > 0 ? Math.round((inPersonCount / totalCount) * 100) : 0}% physical attendance
            </p>
          </div>
        </div>

        {/* Card 4: Plus-Ones & Catering Headcount */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Venue Headcount</span>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              {totalVenueHeadcount}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">pax catered</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-red-600"></span>
              Includes {totalPlusOnes} registered spouses / plus-ones
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Ready for banquet catering order</p>
          </div>
        </div>
      </div>

      {/* Analytical Visual Breakdown Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department / Faculty Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Building className="w-4 h-4 text-blue-800" />
            <span>Attendance by Department</span>
          </h2>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {deptBreakdown.map(([dept, count]) => {
              const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="truncate pr-2">{dept}</span>
                    <span className="text-slate-500 shrink-0">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-900 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* T-Shirt Merdeka Size Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Shirt className="w-4 h-4 text-red-600" />
            <span>Official T-Shirt Size Orders</span>
          </h2>
          <div className="grid grid-cols-4 gap-2.5">
            {Object.entries(shirtBreakdown).map(([size, count]) => (
              <div key={size} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <span className="text-xs font-bold text-slate-500 block">{size}</span>
                <span className="text-xl font-black text-slate-900 font-display block mt-1">{count}</span>
                <span className="text-[10px] text-slate-400">pcs</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-4 text-center font-medium">
            Total {(Object.values(shirtBreakdown) as number[]).reduce((a, b) => a + b, 0)} commemorative shirts reserved
          </p>
        </div>

        {/* Dietary Requirements Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Utensils className="w-4 h-4 text-amber-600" />
            <span>Dietary & Meal Allocations</span>
          </h2>
          <div className="space-y-2.5">
            {dietaryBreakdown.map(([diet, count]) => {
              const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
              return (
                <div key={diet} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-slate-700 capitalize">{diet}</span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900">
                    {count} <span className="text-[10px] font-normal text-slate-400">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Database Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Filters & Search Bar */}
        <div className="p-6 border-b border-slate-200 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="attendance-search-input"
                placeholder="Search by staff name, ID, ticket, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Department Dropdown */}
              <select
                id="filter-dept-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="ALL">All Departments ({attendees.length})</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {/* Mode Dropdown */}
              <select
                id="filter-mode-select"
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="ALL">All Modes</option>
                <option value="in-person">In-Person Only ({inPersonCount})</option>
                <option value="virtual">Virtual Only ({virtualCount})</option>
              </select>

              {/* Status Dropdown */}
              <select
                id="filter-status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="Confirmed">Confirmed ({attendees.filter(a => (a.attendanceStatus || 'Confirmed') === 'Confirmed').length})</option>
                <option value="Checked-In">Checked-In ({checkedInCount})</option>
              </select>

              {/* Sort By Dropdown */}
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Staff Name (A-Z)</option>
                <option value="dept-asc">Department (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong className="text-slate-900">{filteredAttendees.length}</strong> of{' '}
              <strong className="text-slate-900">{attendees.length}</strong> confirmed database records
            </span>
            {(searchTerm || selectedDept !== 'ALL' || selectedMode !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDept('ALL');
                  setSelectedMode('ALL');
                  setSelectedStatus('ALL');
                }}
                className="text-blue-900 hover:underline font-bold"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Staff Member</th>
                <th className="py-3.5 px-4">Ticket & Table</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Mode</th>
                <th className="py-3.5 px-4">Status & Check-In</th>
                <th className="py-3.5 px-4">T-Shirt & Diet</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-bold text-slate-700">No attendance records found matching filters</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting your search query or department filter.</p>
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => {
                  const isCheckedIn = attendee.attendanceStatus === 'Checked-In';
                  return (
                    <tr
                      key={attendee.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCheckedIn ? 'bg-emerald-50/20' : ''
                      }`}
                    >
                      {/* Staff Member */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 text-yellow-400 font-bold flex items-center justify-center text-xs shrink-0">
                            {attendee.employeeName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                              <span>{attendee.employeeName}</span>
                              {attendee.plusOne && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold" title={`Spouse: ${attendee.plusOneName || 'Guest'}`}>
                                  +1
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                              <span>{attendee.employeeId}</span>
                              <span>•</span>
                              <span className="text-slate-400">{attendee.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Ticket & Table */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-xs font-bold text-blue-900">{attendee.ticketNumber}</div>
                        <div className="text-[11px] text-slate-500">{attendee.tableNumber || 'Assigned at door'}</div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{attendee.department}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{attendee.officeLocation}</span>
                        </div>
                      </td>

                      {/* Mode */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            attendee.attendanceType === 'in-person'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {attendee.attendanceType === 'in-person' ? '🏛️ In-Person' : '💻 Virtual'}
                        </span>
                      </td>

                      {/* Status & One-Click Check-In */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleCheckIn(attendee.id)}
                          id={`toggle-checkin-${attendee.id}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                            isCheckedIn
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                          title="Click to toggle on-site check-in"
                        >
                          {isCheckedIn ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Checked In</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>Confirmed (Click to Check In)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* T-Shirt & Dietary */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                            {attendee.shirtSize}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[10px] capitalize">
                            {attendee.dietaryPreference}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewPass(attendee)}
                            id={`view-pass-${attendee.id}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-900 transition-colors"
                            title="View Digital Pass"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {deleteConfirmId === attendee.id ? (
                            <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                              <button
                                onClick={() => handleDeleteAttendee(attendee.id)}
                                className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(attendee.id)}
                              className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete attendee record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Attendee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Add Attendee to Database
                </h3>
                <p className="text-xs text-slate-400">Direct administrator entry for attendance tracking</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                {addError}
              </div>
            )}

            <form onSubmit={handleQuickAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ts. Dr. Ahmad Bin Daud"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UTHM-4089"
                    value={newStaffId}
                    onChange={(e) => setNewStaffId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="staff@uthm.edu.my"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mode</label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="in-person">In-Person (Grand Ballroom)</option>
                    <option value="virtual">Virtual Live Stream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">T-Shirt Size</label>
                  <select
                    value={newShirt}
                    onChange={(e) => setNewShirt(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dietary</label>
                  <select
                    value={newDiet}
                    onChange={(e) => setNewDiet(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="halal">Halal</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="no-beef">No Beef</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
              </div>

              {/* Plus one checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={newPlusOne}
                    onChange={(e) => setNewPlusOne(e.target.checked)}
                    className="rounded text-blue-900 focus:ring-blue-800"
                  />
                  <span>Bringing a spouse / plus-one (+1)</span>
                </label>
                {newPlusOne && (
                  <input
                    type="text"
                    placeholder="Spouse / Plus-One Full Name"
                    value={newPlusOneName}
                    onChange={(e) => setNewPlusOneName(e.target.value)}
                    className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white shadow-sm"
                >
                  Save to Attendance Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
