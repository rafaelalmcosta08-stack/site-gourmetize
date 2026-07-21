import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TickerTape } from './components/TickerTape';
import { LeadCapture } from './components/LeadCapture';
import { Testimonials } from './components/Testimonials';
import { WhoWeAre } from './components/WhoWeAre';
import { WhatWeDo } from './components/WhatWeDo';
import { YellowCallout } from './components/YellowCallout';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { ScrollReveal } from './components/ScrollReveal';
import { LeadFormData } from './types';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  const scrollToForm = () => {
    const element = document.getElementById('formulario');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmitSuccess = (data: LeadFormData) => {
    setSubmittedLead(data);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-black">
      <main>
        {/* Hero Section */}
        <Hero onCtaClick={scrollToForm} />

        {/* Dual Running Ticker Tape Banner */}
        <ScrollReveal duration={0.5} direction="none">
          <TickerTape />
        </ScrollReveal>

        {/* Lead Capture Form Section */}
        <ScrollReveal duration={0.7} direction="up">
          <LeadCapture onSubmitSuccess={handleLeadSubmitSuccess} />
        </ScrollReveal>

        {/* Client Testimonials Section */}
        <ScrollReveal duration={0.7} direction="up">
          <Testimonials />
        </ScrollReveal>

        {/* Quem Somos */}
        <ScrollReveal duration={0.7} direction="up">
          <WhoWeAre />
        </ScrollReveal>

        {/* O Que Fazemos */}
        <ScrollReveal duration={0.7} direction="up">
          <WhatWeDo />
        </ScrollReveal>

        {/* Callout Banner */}
        <ScrollReveal duration={0.6} direction="up">
          <YellowCallout onCtaClick={scrollToForm} />
        </ScrollReveal>

        {/* Perguntas Frequentes */}
        <ScrollReveal duration={0.7} direction="up">
          <FAQ />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <ScrollReveal duration={0.5} direction="up">
        <Footer />
      </ScrollReveal>

      {/* Lead Confirmation Modal */}
      <LeadModal
        leadData={submittedLead}
        onClose={() => setSubmittedLead(null)}
      />
    </div>
  );
}

