"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2, Truck, ArrowRight } from "lucide-react";
import { ServiceItem } from "@/types";
import { DynamicIcon } from "./DynamicIcon";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onGetQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onGetQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-amber-500 text-slate-950">
                Service {service.number}
              </span>
              <span className="text-amber-400 flex items-center gap-1 text-sm font-medium">
                <DynamicIcon name={service.iconName} className="w-4 h-4" />
                Civil Works Division
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-2">
              Scope of Execution
            </h4>
            <p className="text-slate-700 leading-relaxed text-base">
              {service.longDescription}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3">
              Standard Deliverables & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Deployed */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              Machinery & Equipment Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.equipmentUsed.map((equip, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
                >
                  {equip}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Need detailed BOQ estimates or site inspection for this service?
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGetQuote(service.title);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors shadow-md"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
