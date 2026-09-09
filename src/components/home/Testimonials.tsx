"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useManagedContent } from "@/hooks/useManagedContent";
import { SectionHeading } from "../ui/SectionHeading";

export const Testimonials: React.FC = () => {
  const { testimonials } = useManagedContent();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submitReview(formData: FormData) {
    setSending(true);
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
    setSending(false);
    if (response.ok) setSent(true);
  }
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Client & Stakeholder Feedback"
          title="What Our Clients Say"
          subtitle="Feedback from village representatives, project coordinators, and private site developers on our execution standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  “{test.content}”
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {test.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-amber-600">
                    {test.role}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
                    {test.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <form action={submitReview} className="max-w-2xl mx-auto mt-10 p-5 rounded-2xl border border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Your name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="organization" placeholder="Company / organization (optional)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <select name="rating" defaultValue="5" className="rounded-lg border border-slate-300 px-3 py-2 text-sm"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select>
          <input name="role" placeholder="Role (optional)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <textarea name="content" required placeholder="Share your experience" className="sm:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm min-h-24" />
          <div className="sm:col-span-2 flex items-center justify-between gap-3"><p className="text-xs text-slate-500">Reviews are published after admin approval.</p><button disabled={sending || sent} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{sent ? "Review submitted" : sending ? "Submitting..." : "Submit review"}</button></div>
        </form>
      </div>
    </section>
  );
};
