"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Projects } from "@/components/home/Projects";
import { Equipment } from "@/components/home/Equipment";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SafetyQuality } from "@/components/home/SafetyQuality";
import { WorkProcess } from "@/components/home/WorkProcess";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { Contact } from "@/components/home/Contact";
import { MapSection } from "@/components/home/MapSection";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { QuoteModal } from "@/components/layout/QuoteModal";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState("");

  const handleOpenQuote = (serviceName?: string) => {
    setQuoteInitialService(serviceName || "");
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
    setQuoteInitialService("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Header onOpenQuote={handleOpenQuote} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section with Trust Badges */}
        <Hero onOpenQuote={() => handleOpenQuote()} />

        {/* About Us & Milestone Statistics */}
        <About />

        {/* 8 Civil & Infrastructure Services */}
        <Services onOpenQuote={handleOpenQuote} />


        {/* Filterable Project Portfolio Gallery */}
        <Projects onOpenQuote={handleOpenQuote} />

        {/* Heavy Equipment & Machinery Showcase */}
        <Equipment onOpenQuote={handleOpenQuote} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Safety & Quality Standards */}
        <SafetyQuality />

        {/* 5-Step Work Process Timeline */}
        <WorkProcess />

        {/* Client & Stakeholder Testimonials */}
        <Testimonials />

        {/* High-Impact Project CTA Banner */}
        <CTASection onOpenQuote={() => handleOpenQuote()} />

        {/* Contact Details & Validated Enquiry Form */}
        <Contact />

        {/* Responsive Google Maps Embed */}
        <MapSection />
      </main>

      {/* Corporate Dark Footer */}
      <Footer />

      {/* Floating WhatsApp Action & Mobile Sticky Bar */}
      <WhatsAppButton />

      {/* Quick Estimate / Consultation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        initialService={quoteInitialService}
      />
    </div>
  );
}
