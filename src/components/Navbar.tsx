import React, { useState } from 'react';
import { Sparkles, Calendar, Users, FileText, Menu, X, CheckCircle, Award } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';
import { EmployeeRegistration } from '../types';

interface NavbarProps {
  currentRegistration?: EmployeeRegistration | null;
  onOpenMyPass: () => void;
  registeredCount: number;
  capacity: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRegistration,
  onOpenMyPass,
  registeredCount,
  capacity,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouted, setShouted] = useState(false);

  const handleMerdekaShout = () => {
    triggerMerdekaConfetti();
    setShouted(true);
    setTimeout(() => setShouted(false), 2000);
  };

  const navLinks = [
    { label: 'Event Details', href: '#details' },
    { label: 'Itinerary', href: '#itinerary' },
    { label: 'Competitions & Sukan', href: '#activities' },
    { label: 'Colleagues RSVP', href: '#directory' },
    { label: 'Unity Wall', href: '#wishes' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Patriotic Ribbon Bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-red-600 via-amber-400 to-blue-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Company Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group py-1" id="nav-brand-logo">
            <div className="bg-white p-1 rounded-xl shadow-xs border border-slate-100 flex items-center">
              <img
                src="/images/uthm-logo.png"
                alt="Universiti Tun Hussein Onn Malaysia (UTHM)"
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 font-display flex items-center gap-1.5">
                <span>JIWA MERDEKA 2026</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold tracking-wider">
                  KE-69
                </span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Staff Celebration & Gathering
              </span>
            </div>
          </a>

          {/* Desktop Nav Links in Geometric Balance uppercase style */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Interactive "Laung Merdeka" Button */}
            <button
              id="shout-merdeka-btn"
              onClick={handleMerdekaShout}
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 ${
                shouted
                  ? 'bg-yellow-400 text-slate-950 scale-105 ring-2 ring-yellow-500 font-black'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
              }`}
              title="Click to celebrate with confetti!"
            >
              <span className="text-base">🇲🇾</span>
              <span className="hidden sm:inline">Laung</span> Merdeka!
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            </button>

            {/* If registered, show My Pass button, else direct to Register */}
            {currentRegistration ? (
              <button
                id="open-my-pass-btn"
                onClick={onOpenMyPass}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-800 hover:bg-blue-900 text-white shadow-sm transition-all"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>My Pass</span>
              </button>
            ) : (
              <a
                href="#register"
                id="nav-register-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow-sm transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RSVP</span>
                <span className="text-[10px] bg-slate-900/15 px-1.5 py-0.5 rounded-md font-bold">
                  {registeredCount}/{capacity}
                </span>
              </a>
            )}

            {/* Geometric Avatar/Status Indicator */}
            <div
              className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white shadow-xs hidden sm:flex items-center justify-center text-xs font-bold text-slate-700 select-none"
              title="Employee Portal Active"
            >
              🇲🇾
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-bold text-white bg-blue-700 rounded-xl"
            >
              Employee Registration Form
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
