"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowUpRight, Send, AlertCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";
import { PillButton } from "@/components/ui/pill-button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<{
    field: "email" | "message" | null;
    message: string;
  }>({ field: null, message: "" });

  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const clearFieldError = (field: "email" | "message") => {
    if (fieldError.field === field) {
      setFieldError({ field: null, message: "" });
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate required email field
    if (!email.trim()) {
      setFieldError({ field: "email", message: "Please fill out this field." });
      emailRef.current?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFieldError({
        field: "email",
        message: "Please enter a valid email address.",
      });
      emailRef.current?.focus();
      return;
    }

    // Validate required message field
    if (!message.trim()) {
      setFieldError({
        field: "message",
        message: "Please fill out this field.",
      });
      messageRef.current?.focus();
      return;
    }

    setFieldError({ field: null, message: "" });
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to send message. Please try again.",
        );
      }

      setFormSubmitted(true);
      setMessage("");
      setEmail("");
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="w-full pt-16 sm:pt-24">
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
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email Field with Floating Modern Error Popup */}
                <div className="relative">
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    required
                    onInvalid={(e) => e.preventDefault()}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                    onFocus={() => clearFieldError("email")}
                    placeholder="Your email (so I can reply back)"
                    className={cn(
                      "w-full bg-neutral-900 text-white placeholder-neutral-500 px-4 py-3 rounded-2xl text-sm border transition-colors",
                      fieldError.field === "email"
                        ? "border-red-500/50 focus:border-red-400 focus:outline-none"
                        : "border-neutral-800 focus:outline-none focus:border-white/40",
                    )}
                    disabled={isSubmitting}
                  />

                  {/* Themed Rounded Error Tooltip for Email */}
                  <AnimatePresence>
                    {fieldError.field === "email" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{
                          duration: 0.16,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="absolute left-3 top-full mt-2.5 z-30 flex items-center gap-2 px-3.5 py-2 bg-[#18181b] border border-red-500/30 text-neutral-200 text-xs rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.65)] backdrop-blur-md select-none pointer-events-none"
                      >
                        {/* Caret pointing up to input */}
                        <div className="absolute -top-1.5 left-5 w-3 h-3 bg-[#18181b] border-t border-l border-red-500/30 rotate-45" />
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 relative z-10" />
                        <span className="relative z-10 font-medium tracking-tight text-neutral-100">
                          {fieldError.message}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Textarea with Floating Modern Error Popup */}
                <div className="relative">
                  <textarea
                    ref={messageRef}
                    value={message}
                    required
                    onInvalid={(e) => e.preventDefault()}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearFieldError("message");
                    }}
                    onFocus={() => clearFieldError("message")}
                    placeholder="Send a quick note or project inquiry..."
                    rows={3}
                    className={cn(
                      "w-full bg-neutral-900 text-white placeholder-neutral-500 p-4 rounded-2xl text-sm border resize-none transition-colors",
                      fieldError.field === "message"
                        ? "border-red-500/50 focus:border-red-400 focus:outline-none"
                        : "border-neutral-800 focus:outline-none focus:border-white/40",
                    )}
                    disabled={isSubmitting}
                  />

                  {/* Themed Rounded Error Tooltip for Message */}
                  <AnimatePresence>
                    {fieldError.field === "message" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{
                          duration: 0.16,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="absolute left-3 top-full mt-2.5 z-30 flex items-center gap-2 px-3.5 py-2 bg-[#18181b] border border-red-500/30 text-neutral-200 text-xs rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.65)] backdrop-blur-md select-none pointer-events-none"
                      >
                        {/* Caret pointing up to textarea */}
                        <div className="absolute -top-1.5 left-5 w-3 h-3 bg-[#18181b] border-t border-l border-red-500/30 rotate-45" />
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 relative z-10" />
                        <span className="relative z-10 font-medium tracking-tight text-neutral-100">
                          {fieldError.message}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-2xl font-mono"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <PillButton
                  type="submit"
                  variant="white"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full font-semibold text-neutral-950 bg-white hover:bg-neutral-200 py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting
                    ? "Sending..."
                    : formSubmitted
                      ? "Message Sent! ✓"
                      : "Submit"}
                </PillButton>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Footer Container (Matching the obsidian footer from screenshot) */}
      <footer className="relative w-full bg-[#0a0a0b] text-white pt-24 pb-48 overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
            {/* Left Headline (Matching "Scaling Start-ups for Growth." from reference screenshot) */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold text-white leading-[1.08] font-sans">
                Engineering Scalable Interfaces for Growth.
              </h2>
              <div className="text-xs font-mono text-neutral-400 pt-2 mb-24">
                Built with Next.js · Tailwind CSS · Framer Motion · TypeScript
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
        </div>

        {/* Massive Giant Background Watermark Text: SURBHI — positioned absolutely to span full footer width */}
        <div className="absolute bottom-0 left-0 right-0 text-center leading-none select-none pointer-events-none opacity-20 overflow-hidden">
          <span className="text-[22vw] font-extrabold uppercase font-sans text-neutral-500/40 block leading-[0.8] whitespace-nowrap">
            {PORTFOLIO_DATA.personal.name}
          </span>
        </div>
      </footer>
    </section>
  );
}
