import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS, EVENT_DETAILS } from '../data/eventData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            Employee Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            Have questions about transportation, attire, or remote participation? We have answers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-[1.5rem] border border-slate-200 overflow-hidden transition-all bg-white shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-display font-black">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/60 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact HR Committee Banner in Geometric Deep Blue Card */}
        <div className="mt-12 p-8 rounded-[2rem] bg-blue-900 border border-blue-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-[-30%] right-[-10%] w-48 h-48 bg-yellow-400 rounded-full opacity-20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-900 flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black font-display text-white">Still have questions?</h4>
              <p className="text-xs text-blue-100 font-medium mt-0.5">
                Contact the SRKK Merdeka Organizing Committee at {EVENT_DETAILS.coordinatorContact}
              </p>
            </div>
          </div>
          <a
            href="mailto:hr-events@srkk.com?subject=Inquiry:%20SRKK%20Merdeka%20Celebration%202026"
            className="relative z-10 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-colors shrink-0 shadow-md cursor-pointer"
          >
            Email Committee
          </a>
        </div>
      </div>
    </section>
  );
};
