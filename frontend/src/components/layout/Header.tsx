"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, HardHat, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface HeaderProps {
  onOpenQuote: (service?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Equipment", href: "#equipment" },
    { name: "Safety & Quality", href: "#safety" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800/80"
          : "bg-gradient-to-b from-slate-950/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Company Brand & Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <HardHat className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
                Mayil Engineering <span className="text-amber-500">&amp; Traders</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300 tracking-wider uppercase">
                Civil & Infrastructure Contractor
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-amber-400 px-3 py-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all active:scale-95"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 rounded-lg font-bold text-xs text-slate-950 bg-amber-500"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 px-5 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-xl transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </nav>

          <div className="pt-4 mt-3 border-t border-slate-800/80 space-y-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-800 text-slate-200 font-bold text-sm bg-slate-900/80 hover:bg-slate-900"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call: {siteConfig.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 text-center"
            >
              Request a Project Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
