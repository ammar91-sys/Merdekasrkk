import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Download, CheckCircle2, Flame, Gift, Award, Share2 } from 'lucide-react';
import { EVENT_DETAILS, HIGHLIGHT_STATS } from '../data/eventData';
import { ASSETS } from '../assets/images';
import { generateIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface HeroSectionProps {
  registeredCount: number;
  capacity: number;
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  registeredCount,
  capacity,
  onOpenRegister,
}) => {
  // Countdown Timer calculation to event date (28 Aug 2026 14:00 MYT)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.rawDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If event has arrived/passed, show celebration mode
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const percentageFilled = Math.min(100, Math.round((registeredCount / capacity) * 100));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SRKK Jiwa Merdeka 2026 Celebration',
          text: 'Join the annual SRKK Merdeka Celebration! Register your spot for the cultural feast, games, and prizes.',
          url: window.location.href,
        });
      } catch (err) {
        // fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="relative bg-slate-50 text-slate-900 pt-6 pb-12 lg:pt-8 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="font-bold text-blue-900">UTHM Jiwa Merdeka</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Official Staff Event RSVP Active</span>
          </div>

          {/* Share & Badge Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-700" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
            </button>
          </div>
        </div>

        {/* Main Geometric Balance Grid: Left 7-col Blue Card, Right 5-col Logistics & RSVP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Signature Deep Blue Geometric Hero Card */}
          <section className="lg:col-span-7 bg-blue-900 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-white shadow-2xl border border-blue-800">
            {/* Geometric Glowing Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-red-600 rounded-full opacity-30 blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Company Logo Badge & 69 Years Pill */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="bg-white px-3.5 py-1.5 rounded-2xl shadow-md inline-flex items-center">
                  <img
                    src="/images/uthm-logo.png"
                    alt="Universiti Tun Hussein Onn Malaysia (UTHM)"
                    className="h-8 sm:h-9 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  69 Years of Independence
                </div>
              </div>

              {/* Ultra-bold Display Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-4 font-display">
                MERDEKA <br />
                <span className="text-yellow-400">2026.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-blue-100 max-w-lg font-medium leading-relaxed mb-6">
                SRKK Independence Day Celebration: Uniting for Excellence, Innovation, and a Brighter Future Together. Teguh Bersama, Memacu Masa Depan.
              </p>

              {/* Quick Perks Pill Row */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-800/80 border border-blue-700/60 text-xs font-semibold text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  Polo Shirt & Batik Bag
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-800/80 border border-blue-700/60 text-xs font-semibold text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  RM 5,000+ Prize Pool
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-800/80 border border-blue-700/60 text-xs font-semibold text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  Halal Heritage Feast
                </span>
              </div>
            </div>

            {/* Geometric Bottom Bar with Dots, Event ID & Watermark */}
            <div className="relative z-10 flex items-end justify-between pt-10 mt-8 border-t border-blue-800/60">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-white opacity-40"></div>
                  <div className="w-3 h-3 rounded-full bg-white opacity-40"></div>
                </div>
                <span className="text-xs sm:text-sm font-mono opacity-60 uppercase tracking-widest">
                  Event ID: MERD69-2026
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-5xl sm:text-6xl font-black text-white/10 select-none tracking-tight pointer-events-none">
                  MALAYSIA
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Event Logistics & Employee Registration / Countdown */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Section 1: Event Logistics Card */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                Event Logistics
              </h3>

              <div className="space-y-6">
                {/* Logistics Item 1: Date */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{EVENT_DETAILS.date}</p>
                    <p className="text-xs text-slate-500 font-medium">{EVENT_DETAILS.time}</p>
                  </div>
                </div>

                {/* Logistics Item 2: Venue */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center shrink-0 text-yellow-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Connexion CCEC Bangsar South</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Grand Ballroom, Level 3A & Teams Hybrid
                    </p>
                  </div>
                </div>

                {/* Logistics Item 3: Attire */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 text-red-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Traditional Attire / Colors</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Batik or Cultural Outfits • RM 2,000 Cash Pool
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Countdown & Attendance Action Card */}
            <section className="bg-slate-900 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-yellow-400 font-display">
                    Countdown to Celebration
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    RSVP Closes Aug 19
                  </span>
                </div>

                {/* Geometric 4-Block Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                    <span className="block text-2xl font-black text-white font-display">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      Days
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                    <span className="block text-2xl font-black text-yellow-400 font-display">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      Hours
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                    <span className="block text-2xl font-black text-white font-display">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      Mins
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                    <span className="block text-2xl font-black text-red-400 font-display">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      Secs
                    </span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-[11px] text-slate-400">Ballroom Seats</span>
                    <span className="text-xs font-bold text-yellow-400">
                      {registeredCount} / {capacity} ({percentageFilled}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 via-yellow-400 to-red-500 transition-all duration-500"
                      style={{ width: `${percentageFilled}%` }}
                    ></div>
                  </div>
                </div>

                {/* Geometric Button: Confirm My Attendance */}
                <a
                  href="#register"
                  id="hero-rsvp-cta-btn"
                  onClick={onOpenRegister}
                  className="w-full bg-yellow-400 text-slate-900 font-black py-3.5 px-4 rounded-xl mt-2 hover:bg-yellow-300 transition-colors uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer text-center"
                >
                  <span>Confirm My Attendance</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Secondary Actions: Calendar Sync */}
                <div className="flex items-center justify-between pt-1">
                  <div className="relative">
                    <button
                      id="add-to-calendar-btn"
                      onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>Add to Calendar</span>
                    </button>

                    {calendarMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-xl py-2 z-20">
                        <a
                          href={getGoogleCalendarUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="block px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white"
                          onClick={() => setCalendarMenuOpen(false)}
                        >
                          Google Calendar
                        </a>
                        <button
                          onClick={() => {
                            generateIcsFile();
                            setCalendarMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-between"
                        >
                          <span>Outlook / iCal (.ics)</span>
                          <Download className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <a
                    href="#itinerary"
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    View Schedule →
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Feature Celebratory Artwork & Cultural Showcase Banner */}
        <div className="rounded-[2rem] bg-white border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Artwork Frame with Geometric Rounded Corner */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 relative aspect-16/9 group">
              <img
                src={ASSETS.heroBanner}
                alt="SRKK Merdeka Celebration Artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-xs font-bold text-yellow-400 border border-slate-700/80">
                  🌺 Bunga Raya & Jalur Gemilang
                </span>
                <span className="px-3 py-1 rounded-lg bg-red-600 text-xs font-bold text-white shadow-xs">
                  National Day 2026
                </span>
              </div>
            </div>

            {/* Narrative & Values */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                Malaysian Corporate Harmony
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                Celebrating Unity & Technology Innovation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                As SRKK advances digital transformation across Southeast Asia, our strength stems from our diverse Malaysian heritage. Join your teammates from all business units for an unforgettable afternoon of cultural dress, kampung games, and gastronomic indulgence.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>4 Regional Offices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span>50+ Cultural Buffet Dishes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span>RM 5,000 Lucky Draw Pool</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row in Geometric Balance theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HIGHLIGHT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[1.5rem] bg-white border border-slate-200 text-center sm:text-left shadow-2xs hover:shadow-sm transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-xs text-blue-700 font-semibold mt-0.5">{stat.target}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
