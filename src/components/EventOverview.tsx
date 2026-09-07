import React, { useState } from 'react';
import { MapPin, Calendar, Compass, ShieldCheck, Shirt, Utensils, Video, Sparkles, ExternalLink, Info } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

export const EventOverview: React.FC = () => {
  const [activeDressTab, setActiveDressTab] = useState<'traditional' | 'patriotic' | 'guidelines'>('traditional');

  return (
    <section id="details" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Geometric Balance typography */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            Event Blueprint & Logistics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            A corporate celebration honouring 69 years of Malaysian independence, unity across our diversity, and the spirit of innovation at SRKK.
          </p>
        </div>

        {/* 4 Core Pillars Grid in Geometric Balance cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Date & Schedule */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">Date & Timing</h3>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mt-1">{EVENT_DETAILS.date}</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Doors open at <strong>2:00 PM</strong> for registration, Kompang welcoming, and goodie bag collection. Official celebration begins at 2:30 PM sharp.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Duration</span>
              <span className="text-slate-800 font-mono">5.5 Hours</span>
            </div>
          </div>

          {/* Venue & Location */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">Venue & Access</h3>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">Connexion Nexus Bangsar South</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Grand Ballroom, Level 3A, Nexus. Direct covered link bridge from Kerinchi & Universiti LRT stations. Complimentary validated parking provided.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Parking</span>
              <span className="text-emerald-600">Free Validated</span>
            </div>
          </div>

          {/* Feast & Cuisine */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-6">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">Santapan Warisan</h3>
              <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mt-1">100% Halal Certified Feast</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Over 45 authentic Malaysian dishes from Satay Kajang, Rendang Tok, live Char Kway Teow counter, to Nyonya delicacies, Cendol & vegan selections.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Selection</span>
              <span className="text-slate-800 font-mono">45+ Dishes</span>
            </div>
          </div>

          {/* Regional & Remote Hybrid */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">Hybrid Broadcast</h3>
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mt-1">Penang, JB & Singapore</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Interactive high-definition broadcast with real-time digital voting for Best Dressed runway and synchronized trivia with remote snack hampers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Platform</span>
              <span className="text-slate-800 font-mono">MS Teams HD</span>
            </div>
          </div>
        </div>

        {/* Dress Code & Attire Feature Card in Deep Blue Geometric Style */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-blue-900 text-white shadow-2xl border border-blue-800 relative overflow-hidden">
          {/* Geometric Glowing Orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-yellow-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-red-600 rounded-full opacity-25 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-red-600 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                Official Dress Code Guide
              </div>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-display text-white">
                Busana Warisan Tradisional & <span className="text-yellow-400">Jalur Gemilang Glam</span>
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
                Embrace the rich heritage of Malaysia! Stand a chance to win from the <strong className="text-yellow-400">RM 2,000 Best Dressed Cash Pool</strong> by dressing in traditional attire or smart casual in Malaysia’s national colors.
              </p>

              {/* Attire Category Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveDressTab('traditional')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDressTab === 'traditional'
                      ? 'bg-yellow-400 text-slate-900 shadow-sm'
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                  }`}
                >
                  Traditional Attire
                </button>
                <button
                  onClick={() => setActiveDressTab('patriotic')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDressTab === 'patriotic'
                      ? 'bg-yellow-400 text-slate-900 shadow-sm'
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                  }`}
                >
                  Jalur Gemilang Palette
                </button>
                <button
                  onClick={() => setActiveDressTab('guidelines')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDressTab === 'guidelines'
                      ? 'bg-yellow-400 text-slate-900 shadow-sm'
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                  }`}
                >
                  Judging Criteria
                </button>
              </div>

              {/* Dynamic Tab Content */}
              <div className="p-5 rounded-2xl bg-blue-950/80 border border-blue-800/80 text-xs sm:text-sm text-blue-100">
                {activeDressTab === 'traditional' && (
                  <div className="space-y-2">
                    <p className="font-bold text-yellow-400 uppercase tracking-wider text-xs">
                      Recommended Traditional Outfits:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-blue-100 text-xs sm:text-sm">
                      <li><strong>Malay:</strong> Baju Melayu with Sampin & Songkok, Baju Kurung Pahang, Kebaya Nyonya</li>
                      <li><strong>Chinese:</strong> Modern Cheongsam / Qipao, Tang suit, Samfoo</li>
                      <li><strong>Indian:</strong> Saree, Kurta Pyjama, Sherwani, Veshti</li>
                      <li><strong>Borneo Heritage:</strong> Kadazan-Dusun, Iban, or Orang Ulu woven vest/motifs</li>
                    </ul>
                  </div>
                )}

                {activeDressTab === 'patriotic' && (
                  <div className="space-y-2.5">
                    <p className="font-bold text-yellow-400 uppercase tracking-wider text-xs">
                      Smart Casual with Patriotic Color Accents:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-red-600 text-white font-bold">Crimson Red</div>
                      <div className="p-2.5 rounded-xl bg-blue-700 text-white font-bold">Royal Blue</div>
                      <div className="p-2.5 rounded-xl bg-yellow-400 text-slate-900 font-black">Golden Yellow</div>
                      <div className="p-2.5 rounded-xl bg-white text-slate-900 font-bold">Pure White</div>
                    </div>
                    <p className="text-blue-200 text-xs">
                      Pair smart blazers, batik shirts, or dresses in these national color tones!
                    </p>
                  </div>
                )}

                {activeDressTab === 'guidelines' && (
                  <div className="space-y-2 text-blue-100 text-xs sm:text-sm">
                    <p className="font-bold text-yellow-400 uppercase tracking-wider text-xs">Judging Criteria (Total 100%):</p>
                    <p>• <strong>40% Cultural Authenticity & Effort:</strong> Traditional accuracy, accessories (tanjak, kerongsang, jewellery).</p>
                    <p>• <strong>30% Styling & Creative Presentation:</strong> Harmony of colors and fit.</p>
                    <p>• <strong>30% Stage Confidence & Audience Cheers:</strong> Runway walk at 5:30 PM!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Mini Card: Venue Map & Logistics */}
            <div className="lg:col-span-5 bg-slate-900 rounded-[2rem] p-6 sm:p-7 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                  Location & Directions
                </span>
                <span className="text-[10px] font-mono uppercase bg-blue-900 text-blue-200 px-2.5 py-1 rounded-full">
                  Bangsar South
                </span>
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-800/80 border border-slate-700 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Connexion CCEC @ Nexus</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Level 3A, Nexus, No. 7, Jalan Kerinchi, Bangsar South, Kuala Lumpur
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/80 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span><strong>LRT:</strong> Kerinchi Station (5 min covered bridge walk)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span><strong>Parking:</strong> B1 & B2 Basement Nexus (stamped at entrance)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span><strong>Grab Drop-off:</strong> Nexus Bangsar South Main Lobby</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Connexion+Conference+%26+Event+Centre+Nexus+Bangsar+South"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
