"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Check, ArrowUpRight, Send, Clock } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";
import { PillButton } from "@/components/ui/pill-button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setMessage("");
    }, 4000);
  };

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="w-full pt-16 sm:pt-24 overflow-hidden">
      {/* Top Form & Social Links Section (Matching top part of reference screenshot) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Left Column: Social Icon Pills */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="text-xs font-mono tracking-widest uppercase font-semibold text-neutral-500">
              CONNECT WITH ME
            </span>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-neutral-200/80 hover:bg-neutral-950 hover:text-white flex items-center justify-center text-neutral-800 transition-all duration-200 shadow-sm border border-neutral-300/60"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-neutral-200/80 hover:bg-neutral-950 hover:text-white flex items-center justify-center text-neutral-800 transition-all duration-200 shadow-sm border border-neutral-300/60"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-neutral-200/80 hover:bg-neutral-950 hover:text-white flex items-center justify-center text-neutral-800 transition-all duration-200 shadow-sm border border-neutral-300/60"
                title="Twitter / X"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="w-12 h-12 rounded-xl bg-neutral-200/80 hover:bg-neutral-950 hover:text-white flex items-center justify-center text-neutral-800 transition-all duration-200 shadow-sm border border-neutral-300/60"
                title="Email Me"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Input Form Box (Matching exact form box from screenshot) */}
          <div className="lg:col-span-6 flex justify-end">
            <div className="w-full max-w-lg bg-[#0d0d0e] text-white p-6 sm:p-7 rounded-[28px] shadow-2xl border border-neutral-800 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a quick note or project inquiry..."
                  rows={3}
                  className="w-full bg-neutral-900 text-white placeholder-neutral-500 p-4 rounded-2xl text-sm border border-neutral-800 focus:outline-none focus:border-white/40 resize-none transition-colors"
                />

                <PillButton
                  type="submit"
                  variant="white"
                  size="md"
                  className="w-full font-semibold text-neutral-950 bg-white hover:bg-neutral-200 py-3 rounded-2xl"
                >
                  {formSubmitted ? "Message Sent! ✓" : "Submit"}
                </PillButton>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Footer Container (Matching the obsidian footer from screenshot) */}
      <footer className="relative w-full bg-[#0a0a0b] text-white pt-20 pb-16 overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
            {/* Left Headline (Matching "Scaling Start-ups for Growth." from reference screenshot) */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold text-white leading-[1.08] font-sans">
                Engineering Scalable Interfaces for Growth.
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-2">
                <Clock className="w-3.5 h-3.5" />
                <span>BANGALORE ({currentTime || "17:29 IST"})</span>
              </div>
            </div>

            {/* Middle Column: /Quick links (Matching reference screenshot) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono tracking-wider uppercase font-semibold text-neutral-400 block">
                /Quick links
              </span>

              <div className="flex flex-wrap gap-2.5 max-w-xs">
                {PORTFOLIO_DATA.navigation.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="px-5 py-2 rounded-2xl bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-200 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: /Contact (Matching reference screenshot) */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-xs font-mono tracking-wider uppercase font-semibold text-neutral-400 block">
                /Contact
              </span>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-base font-semibold text-white hover:text-neutral-300 transition-colors inline-block"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <div className="text-xs text-neutral-400 font-mono">
                {PORTFOLIO_DATA.personal.location}
              </div>
            </div>
          </div>

          {/* Massive Giant Background Watermark Text: SURBHI (Constrained to prevent horizontal overflow) */}
          <div className="w-full max-w-full text-center overflow-hidden leading-none select-none pointer-events-none opacity-20">
            <span className="text-[19vw] font-extrabold uppercase font-sans text-neutral-500/40 block leading-none -mb-8 sm:-mb-8 truncate">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
            <div>
              © {PORTFOLIO_DATA.personal.copyrightYear}{" "}
              {PORTFOLIO_DATA.personal.fullName}. All rights reserved.
            </div>
            <div>{PORTFOLIO_DATA.personal.timeline}</div>
          </div>
        </div>
      </footer>
    </section>
  );
}
