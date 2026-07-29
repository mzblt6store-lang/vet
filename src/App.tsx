import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { PetHealthCalculator } from './components/PetHealthCalculator';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Footer } from './components/Footer';
import { AdminCRM } from './components/admin/AdminCRM';
import { AdminLogin } from './components/admin/AdminLogin';
import { supabase } from './lib/supabase';
import { CLINIC_INFO, SERVICES } from './data/veterinaryData';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(() => 
    window.location.hash === '#admin' || window.location.pathname === '/admin'
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(window.location.hash === '#admin' || window.location.pathname === '/admin');
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
      subscription.unsubscribe();
    };
  }, []);

  const handleOpenBooking = (serviceId?: string, petSpecies?: string) => {
    let msg = "🤖 *AGENDAMIENTO DE CITA CON BOT VETAMOR*\n\nHola *Bot VetAmor*, me gustaría agendar una cita médica para mi mascota.";
    if (serviceId) {
      const svc = SERVICES.find(s => s.id === serviceId);
      if (svc) {
        msg += `\n🩺 *Servicio de Interés:* ${svc.title}`;
      }
    }
    if (petSpecies) {
      msg += `\n🐾 *Especie:* ${petSpecies}`;
    }
    msg += "\n\nPor favor indícame los horarios y turnos disponibles para la atención. ¡Gracias!";

    const url = `https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (isAdminView) {
    if (isAuthenticated) {
      return <AdminCRM onLogout={() => setIsAuthenticated(false)} />;
    }
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16 md:pb-0">
      
      {/* Header Navigation Bar */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Landing Page Content */}
      <main>
        {/* Hero Banner & Fast Booking Form */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Value Propositions & Fear-Free Philosophy */}
        <ValueProps />

        {/* Certified Doctor Team */}
        <TeamSection />

        {/* Interactive Pet Age & Health Care Calculator */}
        <PetHealthCalculator onOpenBooking={handleOpenBooking} />

        {/* 24/7 Emergency Hotline Callout */}
        <EmergencyBanner />

        {/* Customer Testimonials & Reviews */}
        <TestimonialsSection />

        {/* Interactive Access Map & Parking Location */}
        <InteractiveMapSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating WhatsApp Quick Action Widget */}
      <WhatsAppWidget />

      {/* Sticky Mobile Action Bar for 1-tap Phone, WhatsApp & Appointments */}
      <MobileBottomBar onOpenBooking={handleOpenBooking} />

    </div>
  );
}

