import React, { useState } from 'react';
import { Clock, Tag, UserCheck, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { AGENDA_ITEMS } from '../data/eventData';
import { AgendaItem } from '../types';

export const EventSchedule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'Complete Schedule' },
    { key: 'ceremony', label: 'Ceremony & Speeches' },
    { key: 'cultural', label: 'Cultural Runway' },
    { key: 'games', label: 'Games & Trivia' },
    { key: 'food', label: 'Buffet Feast' },
    { key: 'entertainment', label: 'Performances' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? AGENDA_ITEMS
    : AGENDA_ITEMS.filter((item) => item.category === selectedCategory);

  const getCategoryBadge = (category: AgendaItem['category']) => {
    switch (category) {
      case 'ceremony':
        return { label: 'Ceremony', bg: 'bg-red-100 text-red-700 border-red-200' };
      case 'cultural':
        return { label: 'Cultural Showcase', bg: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'games':
        return { label: 'Games & Trivia', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'food':
        return { label: 'Grand Feast', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'entertainment':
        return { label: 'Performances', bg: 'bg-blue-100 text-blue-700 border-blue-200' };
      default:
        return { label: 'Activity', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <section id="itinerary" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Geometric Balance typography */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            Itinerary & Flow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Event Schedule & Highlights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            From arrival drum beats to the grand RM 5,000 lucky draw finale. Here is how our celebration day unfolds.
          </p>
        </div>

        {/* Category Filters in Geometric Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-yellow-400 text-slate-900 font-black shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline List */}
        <div className="relative space-y-4">
          {/* Vertical Connecting Guide Line */}
          <div className="hidden sm:block absolute left-[125px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

          {filteredItems.map((item) => {
            const badge = getCategoryBadge(item.category);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`relative group rounded-[1.5rem] bg-white border transition-all ${
                  item.highlight
                    ? 'border-yellow-400 shadow-sm ring-1 ring-yellow-400/50'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  {/* Time Badge */}
                  <div className="sm:w-[100px] shrink-0">
                    <span className="inline-flex items-center gap-1 font-mono font-black text-sm sm:text-base text-slate-900">
                      <Clock className="w-3.5 h-3.5 text-red-500 sm:hidden" />
                      {item.time}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {item.highlight && (
                        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-lg bg-yellow-400 text-slate-900 flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors font-display">
                      {item.title}
                    </h3>
                    {item.titleMs && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.titleMs}
                      </p>
                    )}
                  </div>

                  {/* Speaker / Lead Tag */}
                  {item.speakerOrLead && (
                    <div className="sm:text-right text-xs text-slate-500 shrink-0">
                      <span className="block font-semibold text-slate-700">{item.speakerOrLead}</span>
                    </div>
                  )}

                  <div className="text-slate-400 group-hover:text-slate-600 sm:self-center">
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 rounded-b-[1.5rem]">
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
