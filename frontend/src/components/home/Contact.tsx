"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useManagedContent } from "@/hooks/useManagedContent";
import { SectionHeading } from "../ui/SectionHeading";
import { apiFetch } from "@/lib/api";

export const Contact: React.FC = () => {
  const { contact } = useManagedContent();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
    projectType: "Public Works",
    location: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Project location is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const response = await apiFetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
    const result = await response.json();
    setIsSubmitting(false);
    if (response.ok) {
      setRefCode(result.id);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      organization: "",
      projectType: "Public Works",
      location: "",
      details: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Mayil Engineering,\n\nI want to discuss a project:\nName: ${formData.fullName || "Client"}\nProject Type: ${formData.projectType}\nLocation: ${formData.location || "Tamil Nadu"}\nContact: ${formData.phone || ""}\n\nDetails: ${formData.details || "Please contact me."}`
    );
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact & Enquiries"
          title="Get In Touch"
          subtitle="Reach out to our engineering office or submit your project requirements for an accurate estimate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-2xl font-black text-white">
                Contact Information
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connect directly with our project coordinators for tender enquiries, village infrastructure proposals, or heavy machinery deployment.
              </p>

              <div className="space-y-5 pt-2">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${contact.phoneRaw}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* GSTIN */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      GSTIN
                    </span>
                    <p className="text-base sm:text-lg font-bold text-white">
                      {contact.gstin}
                    </p>
                  </div>
                </div>

                {/* Email */}
                {contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Office & Equipment Yard
                    </span>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                      {contact.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Operational Hours
                    </span>
                    <p className="text-sm font-medium text-slate-200">
                      {contact.workingDays}
                    </p>
                    <p className="text-xs text-amber-400 mt-0.5">
                      {contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    contact.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Submit a Project Enquiry
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Fill in your project details below. We will analyze the requirements and contact you with a prompt feasibility and rate structure.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center bg-white rounded-xl border border-emerald-200 shadow-sm space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Thank you! Your enquiry has been submitted successfully.
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  We have safely received your information. A civil project manager will review your location and scope within 24 business hours.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg max-w-xs mx-auto">
                  <span className="text-xs text-amber-800 font-bold block uppercase">
                    Tracking ID
                  </span>
                  <span className="text-lg font-black text-amber-900">{refCode}</span>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={openWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. S. Kumar"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:ring-amber-400 focus:border-amber-500"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:ring-amber-400 focus:border-amber-500"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address <span className="text-xs font-normal text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Company / Developer / Contractor"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                    >
                      <option value="Civil Construction">Civil Construction</option>
                      <option value="Road Construction">Road Construction (Bitumen / CC)</option>
                      <option value="Earthwork & Excavation">Earthwork & Excavation</option>
                      <option value="Drainage Works">Drainage Works</option>
                      <option value="Culvert Construction">Culvert Construction</option>
                      <option value="Water Infrastructure">Water Infrastructure</option>
                      <option value="Building & Civil Works">Building & Civil Works</option>
                      <option value="Land Development">Land Development</option>
                      <option value="Machinery Rental / Service">Heavy Machinery Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project Location <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Tiruchirappalli District"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 ${
                        errors.location
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:ring-amber-400 focus:border-amber-500"
                      }`}
                    />
                    {errors.location && (
                      <p className="text-red-600 text-xs mt-1">{errors.location}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Details & Scope
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Briefly describe the approximate length/area, site condition, or timeframe requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Verifying & Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-500 mt-2">
                    🔒 We respect your privacy. Your contact details are never shared.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
