import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { calculateCardScale, calculateCardTop } from '../utils/math';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    link: '#',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onPreview?: (imageSrc: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onPreview,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = calculateCardScale(index, totalCards, 0.03);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const offsetTop = calculateCardTop(index, 28);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] w-full flex items-start justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(6rem + ${offsetTop}px)`,
        }}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl transition-shadow"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#D7E2EA]/20">
          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            {/* Number: huge, same style as services */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.id}
            </span>

            {/* Category Label */}
            <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider bg-white/10 text-[#D7E2EA] border border-[#D7E2EA]/30">
              {project.category}
            </span>

            {/* Project Name */}
            <h3
              className="font-medium uppercase text-[#D7E2EA] tracking-wide"
              style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)' }}
            >
              {project.name}
            </h3>
          </div>

          {/* Live Project Button */}
          <LiveProjectButton
            label="Live Project"
            onClick={() => onPreview?.(project.col2Image, project.name)}
          />
        </div>

        {/* Bottom Row: 2-column image grid (Left 40%, Right 60%) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-6 sm:pt-8">
          {/* Left Column (40% width -> 5 cols out of 12) with 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div
              onClick={() => onPreview?.(project.col1Image1, `${project.name} - Asset 1`)}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative border border-white/5"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase tracking-widest text-white/90">
                View Asset
              </div>
            </div>

            <div
              onClick={() => onPreview?.(project.col1Image2, `${project.name} - Asset 2`)}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative border border-white/5"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase tracking-widest text-white/90">
                View Asset
              </div>
            </div>
          </div>

          {/* Right Column (60% width -> 7 cols out of 12) with 1 tall image */}
          <div
            onClick={() => onPreview?.(project.col2Image, `${project.name} - Hero render`)}
            className="md:col-span-7 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative border border-white/5 flex items-stretch min-h-[300px] md:min-h-full"
          >
            <img
              src={project.col2Image}
              alt={`${project.name} main showcase`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase tracking-widest text-white/90">
              Enlarge Showcase
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onPreview?: (imageSrc: string, title: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onPreview }) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-32 px-4 sm:px-6 md:px-10 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky-stacking project cards */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onPreview={onPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
