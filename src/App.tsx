/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { LightboxModal } from './components/LightboxModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageSrc: string | null;
    title: string | null;
  }>({
    isOpen: false,
    imageSrc: null,
    title: null,
  });

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handlePreview = (imageSrc: string, title: string) => {
    setLightbox({
      isOpen: true,
      imageSrc,
      title,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox({
      isOpen: false,
      imageSrc: null,
      title: null,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit'] selection:bg-purple-600 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      <main className="w-full">
        {/* 1. HERO SECTION */}
        <HeroSection onContactClick={handleOpenContact} />

        {/* 2. MARQUEE SECTION */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION */}
        <AboutSection onContactClick={handleOpenContact} />

        {/* 4. SERVICES SECTION */}
        <ServicesSection />

        {/* 5. PROJECTS SECTION */}
        <ProjectsSection onPreview={handlePreview} />
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-[#0C0C0C] border-t border-white/10 px-6 md:px-10 py-12 text-[#D7E2EA] z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-black text-xl tracking-wider uppercase text-white">
              Ayan
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
              3D Creator & Visual Designer
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm uppercase tracking-wider text-[#D7E2EA]/70">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Price
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <button
              type="button"
              onClick={handleOpenContact}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#D7E2EA]/50 uppercase tracking-widest">
              © {new Date().getFullYear()} AYAN
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.imageSrc}
        title={lightbox.title}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
