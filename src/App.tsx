import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutExpertise } from './components/AboutExpertise';
import { ProjectsSection } from './components/ProjectsSection';
import { BenchmarkExplorer } from './components/BenchmarkExplorer';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FirebaseDeployModal } from './components/FirebaseDeployModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default dark charcoal for systems engineering aesthetic
  });

  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.className = 'bg-[#0e1116] text-slate-100 antialiased selection:bg-indigo-600/30 selection:text-indigo-200 min-h-screen';
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.className = 'bg-[#f8fafc] text-slate-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-900 min-h-screen';
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Top Bar Contract */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive 3D WebGL Canvas */}
        <HeroSection onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)} />

        {/* Technical Profile, Competencies & Methodologies */}
        <AboutExpertise />

        {/* Interactive Projects Bento Showcase & Architectural Deep-Dives */}
        <ProjectsSection />

        {/* Quantitative Aptitude & Systems Benchmarks Explorer */}
        <BenchmarkExplorer />

        {/* Career Trajectory & Verified Engineering Outcomes */}
        <ExperienceTimeline />

        {/* Contact, Transmission Dispatch & Resume Download */}
        <ContactSection onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)} />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)} />

      {/* Firebase Hosting Production Deployment Runbook Modal */}
      <FirebaseDeployModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </div>
  );
}
