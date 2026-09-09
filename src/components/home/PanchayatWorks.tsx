"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileText, HardHat } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";
import { DynamicIcon } from "../ui/DynamicIcon";

interface PanchayatWorksProps {
  onOpenQuote: (service?: string) => void;
}

export const PanchayatWorks: React.FC<PanchayatWorksProps> = ({ onOpenQuote }) => {
  return (
    <section id="public-works" className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle safety strip pattern accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_20px,#0b192c_20px,#0b192c_40px)]" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Specialized Expertise"
          title="Public & Local Development Works"
          subtitle="Supporting regional infrastructure development through reliable construction, earthwork, road, drainage and public utility solutions."
          dark
        />

        {/* Highlight Grid & Infrastructure Showcase Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: 9 Development Work Categories */}
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HardHat className="w-6 h-6 text-amber-500" />
              <span>Dedicated Infrastructure & Public Work Categories</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {siteConfig.developmentCategories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <DynamicIcon name={category.iconName} className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {category.shortDesc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Infrastructure Hero Image with Overlaid Quote */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                alt="Public road and infrastructure development"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <FileText className="w-4 h-4" />
                  <span>Transparent Estimation</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Built to Department Standards
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  We adhere to approved technical schedules, rate charts, and site verification processes required for high-durability execution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Dark CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              Direct Client & Contractor Liaison
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Planning a Civil or Public Infrastructure Project?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl">
              Get in touch with our civil team for site inspection, BOQ review, and turnkey project execution.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuote("Public Works")}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all shrink-0 active:scale-95 group"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
