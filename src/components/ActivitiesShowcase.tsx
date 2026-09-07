import React from 'react';
import { Sparkles, Trophy, Award, Users, Camera, ArrowUpRight, HelpCircle } from 'lucide-react';
import { CONTESTS } from '../data/eventData';
import { ASSETS } from '../assets/images';

interface ActivitiesShowcaseProps {
  onSelectActivity: (activityTitle: string) => void;
}

export const ActivitiesShowcase: React.FC<ActivitiesShowcaseProps> = ({ onSelectActivity }) => {
  return (
    <section id="activities" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            Grand Contests & Fun Arena
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Competitions, Prizes & Sukan Rakyat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            Showcase your cultural pride, test your wits against fellow SRKKians, and compete for trophies, cash prizes, and tech gadgets!
          </p>
        </div>

        {/* Top Feature Banner with Signature Deep Blue Geometric Style */}
        <div className="mb-12 rounded-[2.5rem] bg-blue-900 text-white shadow-2xl border border-blue-800 relative overflow-hidden">
          {/* Glowing orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-yellow-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-red-600 rounded-full opacity-25 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Narrative */}
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-2xs">
                Malaysian Heritage Revival
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                Rediscover Kampung Games & <span className="text-yellow-400">Cultural Splendour</span>
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
                Step away from keyboards and cloud architectures to experience the warmth of Malaysian folklore, rhythmic kompang beats, wau bulan artistry, and heart-pounding congkak match-ups.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-blue-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span>Congkak Knockouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Batu Seremban Masterclass</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span>360° Photobooth Props</span>
                </div>
              </div>
            </div>

            {/* Right Celebratory Graphic */}
            <div className="lg:col-span-5 relative aspect-4/3 overflow-hidden bg-slate-900 border-l border-blue-800">
              <img
                src={ASSETS.culturalActivities}
                alt="Malaysian Cultural Celebration Art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent lg:bg-linear-to-r lg:from-blue-900 lg:via-transparent lg:to-transparent"></div>
            </div>
          </div>
        </div>

        {/* 4 Major Contests Grid in Geometric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTESTS.map((contest) => (
            <div
              key={contest.id}
              className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                    {contest.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Prizes</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 bg-yellow-100 px-3 py-1 rounded-xl border border-yellow-300 inline-block mt-1">
                      {contest.prizePool}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 font-display">
                  {contest.title}
                </h3>
                <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mt-0.5">
                  {contest.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {contest.description}
                </p>

                {/* Key Rules */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Format & Guidelines:
                  </div>
                  {contest.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-yellow-500 font-bold shrink-0">•</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Opt-In Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Select during RSVP
                </span>
                <button
                  onClick={() => onSelectActivity(contest.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-900 bg-yellow-400 hover:bg-yellow-300 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Sign Up in RSVP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
