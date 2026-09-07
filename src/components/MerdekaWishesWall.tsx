import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, Flame, Smile } from 'lucide-react';
import { MerdekaWish } from '../types';
import { INITIAL_WISHES } from '../data/eventData';
import { triggerSubtleConfetti } from '../utils/confetti';

export const MerdekaWishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<MerdekaWish[]>(INITIAL_WISHES);
  const [authorName, setAuthorName] = useState('');
  const [department, setDepartment] = useState('Cloud Solutions & Infrastructure');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('🇲🇾');
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const stickers = ['🇲🇾', '🌺', '🎆', '🤝', '🏆', '🎉', '🌟', '🦅'];

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;

    setLikedIds([...likedIds, id]);
    setWishes((prev) =>
      prev.map((wish) => (wish.id === id ? { ...wish, likes: wish.likes + 1 } : wish))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: MerdekaWish = {
      id: `wish-${Date.now()}`,
      name: authorName.trim(),
      department: department.trim(),
      message: message.trim(),
      sticker: selectedSticker,
      timestamp: 'Just now',
      likes: 1,
    };

    triggerSubtleConfetti();
    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setMessage('');
  };

  return (
    <section id="wishes" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            Merdeka Unity Wall
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Wishes & Patriotic Cheers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            Leave your national day greetings, celebrate company unity, and cheer on your colleagues!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form to Post a Wish */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1 font-display">
              <MessageSquare className="w-4 h-4 text-blue-900" />
              <span>Post Your Merdeka Wish</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Share your message with the entire SRKK family across Malaysia & Singapore.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Kenneth Tan"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Cloud Solutions / Managed Services"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Pick a Celebration Sticker
                </label>
                <div className="flex flex-wrap gap-2">
                  {stickers.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedSticker(st)}
                      className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        selectedSticker === st
                          ? 'bg-yellow-100 ring-2 ring-yellow-400 scale-110 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Your Greeting or Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Selamat Hari Kebangsaan! Proud to be part of the SRKK team..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-xs text-slate-900 bg-yellow-400 hover:bg-yellow-300 transition-colors uppercase tracking-widest shadow-sm cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Wall</span>
              </button>
            </form>
          </div>

          {/* List of Wishes in Geometric Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishes.map((wish) => {
                const isLiked = likedIds.includes(wish.id);

                return (
                  <div
                    key={wish.id}
                    className="p-6 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-2xl">{wish.sticker}</span>
                        <button
                          onClick={() => handleLike(wish.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isLiked
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'
                            }`}
                          />
                          <span>{wish.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
                        "{wish.message}"
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        <span className="font-bold text-slate-900 block">{wish.name}</span>
                        <span className="text-[10px] text-slate-400">{wish.department}</span>
                      </div>
                      <span className="text-slate-400 font-medium">{wish.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
