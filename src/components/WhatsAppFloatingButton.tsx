import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '60197772167';
  const defaultMessage = encodeURIComponent(
    'Salam, saya ingin bertanya berkenaan program UTHM Jiwa Merdeka 2026.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group print:hidden">
      {/* Floating Prompt Bubble */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-xs animate-bounce duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>Ada soalan? Hubungi urus setia (019-777 2167)</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Downward triangle pointer */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45"></div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-300/60"
        aria-label="Direct WhatsApp link to 0197772167"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          WhatsApp 019-777 2167
        </span>
      </a>
    </div>
  );
};
