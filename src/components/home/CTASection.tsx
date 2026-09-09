"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface CTASectionProps {
  onOpenQuote: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenQuote }) => {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 sm:py-24 bg-slate-950 overflow-hidden text-white">
      {/* Heavy Construction Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1800&q=80"
          alt="Heavy road construction site background"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
          Start Your Infrastructure Project
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white uppercase">
          Have a Civil Infrastructure or Construction Project?
        </h2>

        <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          “Let&apos;s discuss your requirements and build reliable infrastructure together.”
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 transition-all active:scale-95 group"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-white font-bold text-base transition-all active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};
