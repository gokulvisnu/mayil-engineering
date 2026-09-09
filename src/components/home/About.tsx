"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, ShieldCheck } from "lucide-react";
import { useManagedContent } from "@/hooks/useManagedContent";
import { SectionHeading } from "../ui/SectionHeading";

export const About: React.FC = () => {
  const { company, stats } = useManagedContent();
  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Our Company"
          title="Building Infrastructure. Supporting Communities."
          subtitle="Delivering dependable civil construction and grassroots infrastructure for rural local bodies, institutions, and development projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: High-Quality Construction Image with Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                alt="Civil construction site engineers and road work"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shrink-0 font-black text-xl">
                    10+
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                      Years Field Experience
                    </span>
                    <p className="text-xs text-slate-300 font-medium">
                      Proven track record in rural connectivity & civil infrastructure works.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative construction corner accents */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-amber-500 rounded-br-xl pointer-events-none" />
          </motion.div>

          {/* Right Column: Narrative, Mission, Quality, Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed font-semibold text-slate-900 border-l-4 border-amber-500 pl-4 py-1">
                “{company.fullDescription}”
              </p>
              <p className="text-base leading-relaxed text-slate-600 mt-4">
                We take pride in building the foundation of rural and semi-urban growth in India. From paving high-durability village roads and culverts to executing extensive drainage networks and earthworks, our dedicated fleet and experienced supervisory team handle every phase with technical precision.
              </p>
            </div>

            {/* Mission & Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Target className="w-4 h-4 text-amber-500" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                {company.mission}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Quality Commitment</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {company.qualityCommitment}
                </p>
              </div>
            </div>

            {/* Editable Statistics Cards Grid */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Milestones & Track Record
                </span>
                <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Current company track record
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 text-white text-center border border-slate-800 shadow-lg hover:border-amber-500/50 transition-colors group"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 group-hover:scale-105 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
