import React from "react";
import { FloatingHeader } from "@/components/navigation/floating-header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
      {/* Floating Capsule Navbar Header */}
      <FloatingHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Spacer: gives the scroll-driven card flip room between Hero and About */}
      <div className="h-[40vh] pointer-events-none" aria-hidden="true" />

      {/* About Section */}
      <AboutSection />

      {/* Manifesto / Value Prop Section */}
      <ManifestoSection />

      {/* Featured Projects Grid Section */}
      <ProjectsSection />

      {/* Engineering Services Section */}
      <ServicesSection />

      {/* Contact & Footer Section */}
      <ContactSection />
    </main>
  );
}
