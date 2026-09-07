import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Bell, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

interface CountdownBannerProps {
  onRsvpClick?: () => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onRsvpClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Target event date: 16 September 2026, 09:00:00 MYT (UTC+8)
    const calculateTime = () => {
      let targetTime = new Date(EVENT_DETAILS.rawDate).getTime();
      const now = new Date().getTime();

      let difference = targetTime - now;

      // If target time is past, roll forward to the next annual Merdeka celebration so countdown is always live
      if (difference <= 0) {
        const nextYearDate = new Date(EVENT_DETAILS.rawDate);
        nextYearDate.setFullYear(new Date().getFullYear() + (difference < -86400000 * 30 ? 1 : 0));
        targetTime = nextYearDate.getTime();
        difference = targetTime - now;
        if (difference <= 0) {
          // Fallback: 10 days ahead to ensure active ticking
          difference = 10 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000;
        }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRegister = () => {
    if (onRsvpClick) {
      onRsvpClick();
    } else {
      const regElem = document.getElementById('register');
      if (regElem) {
        regElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside aria-label="Event Countdown" className="relative z-30 bg-slate-900 border-b border-slate-800 text-white overflow-hidden shadow-lg">
      {/* Patriotic Accent Top Border */}
      <div className="h-1 w-full bg-linear-to-r from-red-600 via-yellow-400 via-blue-600 to-red-600 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Event Branding & Title */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-900/90 border border-blue-700 flex items-center justify-center shrink-0 text-yellow-400 shadow-xs">
              <Clock className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping"></span>
                  Live Countdown
                </span>
                <span className="text-xs font-extrabold text-yellow-400 font-display">
                  UTHM JIWA MERDEKA 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
                <Calendar className="w-3 h-3 text-slate-400 inline" />
                <span>{EVENT_DETAILS.date} • {EVENT_DETAILS.time}</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline text-slate-400">{EVENT_DETAILS.venue}</span>
              </p>
            </div>
          </div>

          {/* Center / Right: The Big Live Countdown Timer Cards */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Days Card */}
            <div className="flex flex-col items-center bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 min-w-[62px] sm:min-w-[72px] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                Hari / Days
              </span>
            </div>

            <span className="text-yellow-400 font-black text-lg sm:text-xl -mt-2 animate-pulse">:</span>

            {/* Hours Card */}
            <div className="flex flex-col items-center bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 min-w-[62px] sm:min-w-[72px] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 font-mono tracking-tight leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                Jam / Hours
              </span>
            </div>

            <span className="text-yellow-400 font-black text-lg sm:text-xl -mt-2 animate-pulse">:</span>

            {/* Minutes Card */}
            <div className="flex flex-col items-center bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 min-w-[62px] sm:min-w-[72px] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                Minit / Mins
              </span>
            </div>

            <span className="text-red-400 font-black text-lg sm:text-xl -mt-2 animate-pulse">:</span>

            {/* Seconds Card */}
            <div className="flex flex-col items-center bg-slate-800/90 border border-red-900/50 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 min-w-[62px] sm:min-w-[72px] shadow-xs relative overflow-hidden">
              <span className="text-xl sm:text-2xl font-black text-red-400 font-mono tracking-tight leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-red-300 tracking-wider mt-1">
                Saat / Secs
              </span>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            </div>
          </div>

          {/* Right Action Button: Confirm Attendance */}
          <div className="shrink-0 hidden lg:block">
            <button
              onClick={scrollToRegister}
              id="countdown-rsvp-btn"
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Confirm Attendance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
