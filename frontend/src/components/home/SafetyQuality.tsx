"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HardHat } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";
import { DynamicIcon } from "../ui/DynamicIcon";

export const SafetyQuality: React.FC = () => {
  return (
    <section id="safety" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Zero Compromise Standards"
          title="Safety & Quality Are Our Priority"
          subtitle="Stringent adherence to civil engineering specifications, worker safety protocols, and certified building materials across all sites."
        />

        {/* Featured Image & Safety Culture Banner */}
        <div className="mb-14 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative h-72 lg:h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                alt="Construction workers wearing helmets and safety gear on site"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden p-3 rounded-lg bg-slate-950/80 text-white text-xs font-bold">
                100% Mandatory PPE Policy on Every Worksite
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase">
                <HardHat className="w-3.5 h-3.5 text-amber-600" />
                <span>Site Protocol Standard</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Safe Sites. Reliable Structures. Lasting Infrastructure.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Every project executed by our team follows standardized safety procedures. From protective gear enforcement and pre-shift site hazard reviews to comprehensive laboratory batch-testing of cement concrete and compaction layers, we maintain uncompromising standards.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-black text-amber-600 block">100%</span>
                  <span className="text-xs font-semibold text-slate-700">PPE Enforcement</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-black text-amber-600 block">IS Codes</span>
                  <span className="text-xs font-semibold text-slate-700">Adhered Materials</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1">
                  <span className="text-lg font-black text-amber-600 block">Zero</span>
                  <span className="text-xs font-semibold text-slate-700">Shortcut Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Safety & Quality Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.safetyPriorities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <DynamicIcon name={item.iconName} className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
