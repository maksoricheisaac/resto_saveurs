"use client";

import { restaurantInfo } from '@/data/restaurant';
import { HeroBanner } from '@/components/public/contact/hero-banner';
import { ContactInfo } from '@/components/public/contact/contact-info';
import { ContactForm } from '@/components/public/contact/contact-form';
import { MapSection } from '@/components/public/contact/map-section';

export default function ContactClient() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite vous contacter`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero avec image de fond */}
      <HeroBanner />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ContactInfo onWhatsAppClick={handleWhatsAppClick} />

          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* Google Maps */}
        <MapSection />
      </div>
    </div>
  );
} 