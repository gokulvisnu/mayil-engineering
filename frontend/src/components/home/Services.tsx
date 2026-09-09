"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ServiceItem } from "@/types";
import { SectionHeading } from "../ui/SectionHeading";
import { DynamicIcon } from "../ui/DynamicIcon";
import { ServiceModal } from "../ui/ServiceModal";

interface ServicesProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background structural lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Core Capabilities"
          title="Our Services"
          subtitle="Complete Civil & Infrastructure Solutions tailored for local bodies, government departments, institutions, and private clients."
        />

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {siteConfig.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-slate-300 group-hover:text-amber-500 transition-colors">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors mb-3 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
                  Learn Scope
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-all group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quick Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-white">
              Need a Custom Civil Construction or Infrastructure Estimate?
            </h4>
            <p className="text-slate-400 text-sm mt-1">
              We provide item-wise civil BOQ rates and site feasibility inspections across Tamil Nadu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shrink-0"
          >
            <span>Request Work Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onGetQuote={(title) => onOpenQuote(title)}
      />
    </section>
  );
};
