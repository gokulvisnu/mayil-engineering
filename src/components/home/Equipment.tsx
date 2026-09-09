"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, CheckCircle, Truck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";

interface EquipmentProps {
  onOpenQuote: (service?: string) => void;
}

export const Equipment: React.FC<EquipmentProps> = ({ onOpenQuote }) => {
  return (
    <section id="equipment" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle safety strip accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="In-House Machinery Fleet"
          title="Our Equipment & Machinery"
          subtitle="Modern, well-maintained civil machinery ensuring rapid mobilization, minimal downtime, and high-efficiency earthmoving."
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {siteConfig.equipment.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/60 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-slate-700">
                    {item.category}
                  </span>

                  {/* Availability Badge */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{item.availability}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Specifications */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                    {item.specifications.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onOpenQuote(`Machinery Request: ${item.name}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Inquire for Project Deployment</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
