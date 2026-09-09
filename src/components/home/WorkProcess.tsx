"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";
import { DynamicIcon } from "../ui/DynamicIcon";

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Execution Methodology"
          title="How We Work"
          subtitle="A structured 5-stage project lifecycle designed for transparency, regulatory adherence, and milestone-driven completion."
        />

        {/* Desktop Horizontal Timeline (hidden on small screens) */}
        <div className="hidden lg:block relative mt-16 mb-8">
          {/* Horizontal Connecting Line */}
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-amber-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {siteConfig.workProcess.map((process, idx) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle with Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-500 shadow-lg flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 group-hover:scale-110">
                    <DynamicIcon name={process.iconName} className="w-7 h-7" />
                  </div>
                  {/* Step Number Tag */}
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black border border-slate-700">
                    {process.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {process.title}
                </h3>
                <p className="text-xs font-semibold text-amber-600/90 mb-2">
                  {process.description}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed px-2">
                  {process.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (visible on screens < 1024px) */}
        <div className="lg:hidden relative mt-10 space-y-8 pl-6 border-l-2 border-amber-400 ml-4">
          {siteConfig.workProcess.map((process, idx) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group bg-slate-50 p-5 rounded-xl border border-slate-200"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[37px] top-4 w-7 h-7 rounded-full bg-amber-500 text-slate-950 border-4 border-white flex items-center justify-center text-[10px] font-black shadow">
                {process.step}
              </div>

              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center">
                  <DynamicIcon name={process.iconName} className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {process.title}
                </h3>
              </div>
              <p className="text-xs font-semibold text-amber-700 mb-1">
                {process.description}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {process.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
