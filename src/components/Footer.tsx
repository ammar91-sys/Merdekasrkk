import React from 'react';
import { Heart, Sparkles, MapPin, Mail } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      {/* Top Jalur Gemilang colored bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-red-600 via-yellow-400 to-blue-900"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company & Event */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center">
                <img
                  src="/images/uthm-logo.png"
                  alt="Universiti Tun Hussein Onn Malaysia (UTHM)"
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-white font-black text-lg font-display tracking-tight block">
                  Jiwa Merdeka 2026
                </span>
                <span className="text-slate-400 text-[11px] font-medium block">
                  Universiti Tun Hussein Onn Malaysia
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-medium">
              Celebrating Malaysian independence, cultural harmony, and academic excellence in technology and innovation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-yellow-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>#UTHMJiwaMerdeka #KeluargaUTHM #Merdeka2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-white font-black uppercase tracking-widest text-[11px] font-display">
              Event Navigation
            </div>
            <ul className="space-y-2 font-medium">
              <li><a href="#details" className="hover:text-yellow-400 transition-colors">Event Details & Venue</a></li>
              <li><a href="#itinerary" className="hover:text-yellow-400 transition-colors">Celebration Agenda</a></li>
              <li><a href="#activities" className="hover:text-yellow-400 transition-colors">Competitions & Prizes</a></li>
              <li><a href="#register" className="hover:text-yellow-400 transition-colors">RSVP & Registration</a></li>
              <li><a href="#directory" className="hover:text-yellow-400 transition-colors">Attendee Directory</a></li>
              <li><a href="#wishes" className="hover:text-yellow-400 transition-colors">Unity Wishes Wall</a></li>
            </ul>
          </div>

          {/* Organizing Committee */}
          <div className="space-y-3">
            <div className="text-white font-black uppercase tracking-widest text-[11px] font-display">
              Organizing Secretariat
            </div>
            <p className="text-slate-300 text-xs font-bold">
              SRKK Human Capital & Sports Club
            </p>
            <p className="text-slate-400 text-xs font-medium">
              {EVENT_DETAILS.coordinatorContact}
            </p>
            <p className="text-slate-400 text-xs font-medium">
              Connexion CCEC Nexus Bangsar South, Kuala Lumpur
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 SRKK Group of Companies. All Rights Reserved. Dedicated for internal employee celebration.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Dihasilkan dengan semangat patriotik</span>
            <span className="text-base">🇲🇾</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
