import React, { useRef } from 'react';
import { X, QrCode, Calendar, Download, CheckCircle2, MapPin, Shirt, Utensils, Printer, Sparkles } from 'lucide-react';
import { EmployeeRegistration } from '../types';
import { EVENT_DETAILS } from '../data/eventData';
import { generateIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface EventPassModalProps {
  registration: EmployeeRegistration | null;
  onClose: () => void;
}

export const EventPassModal: React.FC<EventPassModalProps> = ({ registration, onClose }) => {
  const passRef = useRef<HTMLDivElement>(null);

  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden my-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Celebration Geometric Header */}
        <div className="bg-blue-900 p-6 text-white relative overflow-hidden">
          <div className="absolute top-[-40%] right-[-20%] w-48 h-48 bg-yellow-400 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-[-40%] left-[-20%] w-40 h-40 bg-red-600 rounded-full opacity-25 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between pr-10">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-xs inline-flex items-center">
                <img
                  src="/images/uthm-logo.png"
                  alt="Universiti Tun Hussein Onn Malaysia"
                  className="h-7 sm:h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 block">
                  Official Merdeka E-Pass
                </span>
                <h3 className="text-lg font-black text-white font-display">
                  Jiwa Merdeka 2026
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">
                Ticket No.
              </span>
              <span className="text-sm font-black font-mono text-yellow-400">
                {registration.ticketNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Printable Pass Container */}
        <div ref={passRef} className="p-6 sm:p-8 space-y-6">
          {/* Attendee Profile Section */}
          <div className="rounded-[1.5rem] bg-slate-50 p-6 border border-slate-200 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                Registered Attendee
              </span>
              <div className="text-xl font-black text-slate-900 mt-0.5 font-display">
                {registration.employeeName}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {registration.department} • <span className="font-mono text-slate-700 font-bold">{registration.employeeId}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200/80">
              <div>
                <span className="text-slate-400 block font-medium">Office Hub</span>
                <span className="font-bold text-slate-900">{registration.officeLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Seating Allocation</span>
                <span className="font-bold text-blue-900">{registration.tableNumber || 'Table Allocated'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Polo Shirt Size</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Shirt className="w-3.5 h-3.5 text-slate-400" />
                  {registration.shirtSize}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Dietary Preference</span>
                <span className="font-bold text-slate-900 capitalize flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-slate-400" />
                  {registration.dietaryPreference}
                </span>
              </div>
            </div>

            {registration.plusOne && (
              <div className="pt-2.5 border-t border-slate-200/80 text-xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Plus-One / Companion:</span>
                <span className="font-bold text-slate-900">{registration.plusOneName}</span>
              </div>
            )}
          </div>

          {/* QR Code & Scan Zone */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[1.5rem] bg-white border-2 border-dashed border-slate-300">
            {/* SVG QR Code Simulation */}
            <div className="w-24 h-24 bg-slate-900 p-2.5 rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-4-8h2v2h-2V8zm2 2h2v2h-2v-2zm2-2h2v2h-2V8zm-2-2h2v2h-2V6zm2 2h2v2h-2V8zm-4 4h2v2h-2v-2z" />
              </svg>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Attendance Record</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                registration.attendanceStatus === 'Checked-In'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {registration.attendanceStatus || 'Confirmed'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Present this QR code on your mobile phone at CCEC Nexus Level 3A Registration Desk on Friday, 28 Aug 2026 to collect your badge and polo shirt.
            </p>
          </div>

          {/* Chosen Contests */}
          {registration.activities.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Registered Activities & Contests:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {registration.activities.map((act) => (
                  <span
                    key={act}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold bg-yellow-100 text-slate-900 border border-yellow-200"
                  >
                    🏆 {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Event Quick Reminder */}
          <div className="text-center text-xs text-slate-400 space-y-0.5 font-medium">
            <p><strong>UTHM Jiwa Merdeka 2026</strong> • Friday, 28 Aug 2026 (2:00 PM - 7:30 PM)</p>
            <p>Dress Code: Busana Tradisional Warisan / Jalur Gemilang Glam</p>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={generateIcsFile}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-900 bg-yellow-400 hover:bg-yellow-300 transition-colors cursor-pointer shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
