"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show gentle prompt after 4 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Icon (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2">
        {/* Tooltip banner */}
        {showTooltip && (
          <div className="relative bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 max-w-xs animate-fadeIn flex items-center gap-2">
            <span>Enquire about Civil & Infrastructure Works</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-emerald-500/30 group relative"
          aria-label="Chat on WhatsApp"
        >
          {/* Animated ripple circle */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none" />
          <MessageSquare className="w-7 h-7 relative z-10 fill-current" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar (< 640px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center gap-3">
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs active:bg-slate-800"
        >
          <Phone className="w-4 h-4 text-amber-500" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg active:bg-emerald-700"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
