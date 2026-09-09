"use client";

import React from "react";
import { MapPin, Navigation, Info } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const MapSection: React.FC = () => {
  return (
    <section className="bg-slate-100 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <MapPin className="w-4 h-4" />
              <span>Project Yard & Regional Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Find Us on Google Maps
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Easily update embed coordinates in <code className="text-amber-600 font-mono">src/config/siteConfig.ts</code>.
            </p>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors self-start sm:self-auto"
          >
            <Navigation className="w-4 h-4 text-amber-400" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Embedded Map Container */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-200">
          <iframe
            title="Office and Machinery Yard Location Map"
            src={siteConfig.maps.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] contrast-[1.05]"
          />
          {/* Overlay Tag */}
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/90 text-white backdrop-blur-md border border-slate-700/80 shadow-lg text-xs max-w-xs">
            <span className="font-bold text-amber-400 block">{siteConfig.company.name}</span>
            <span className="text-slate-300 text-[11px] mt-0.5 block">{siteConfig.maps.locationName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
