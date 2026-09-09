"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, HardHat, Truck, Clock, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const trustIcons = [ShieldCheck, HardHat, Truck, Clock];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#projects");
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* High-Resolution Civil Construction Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=2000&q=85"
          alt="Civil construction road and infrastructure background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Dark Dual Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left py-12">
        <div className="max-w-3xl">
          {/* Trust Badge Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Civil & Infrastructure Works Contractor</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight lg:leading-[1.1] uppercase"
          >
            BUILDING BETTER COMMUNITIES THROUGH{" "}
            <span className="text-amber-500 relative inline-block">
              QUALITY INFRASTRUCTURE
              <span className="absolute bottom-1 left-0 w-full h-1 bg-amber-500/40 rounded-full" />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-2xl font-bold text-amber-400/90 mt-4 tracking-normal"
          >
            {siteConfig.company.subTagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal max-w-2xl"
          >
            “{siteConfig.company.shortDescription}”
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-base text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-95 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-500 backdrop-blur-md transition-all active:scale-95"
            >
              <span>View Our Projects</span>
            </a>
          </motion.div>

          {/* 4 Trust Indicators Below Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {siteConfig.trustIndicators.map((indicator, idx) => {
              const IconComp = trustIcons[idx] || CheckCircle;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 sm:gap-3 text-left"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {indicator}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom gradient into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
};
