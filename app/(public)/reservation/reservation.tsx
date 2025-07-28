"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, Users, Star, CheckCircle } from 'lucide-react';
import { ReservationForm } from '@/components/public/reservation/reservation-form';
import { restaurantInfo } from '@/data/restaurant';

export default function ReservationClient() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReservationSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const openingHours = [
    { day: 'Lundi', hours: '11h00 - 22h00' },
    { day: 'Mardi', hours: '11h00 - 22h00' },
    { day: 'Mercredi', hours: '11h00 - 22h00' },
    { day: 'Jeudi', hours: '11h00 - 22h00' },
    { day: 'Vendredi', hours: '11h00 - 23h00' },
    { day: 'Samedi', hours: '11h00 - 23h00' },
    { day: 'Dimanche', hours: '12h00 - 22h00' },
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Réservation simple',
      description: 'Réservez votre table en quelques clics'
    },
    {
      icon: Clock,
      title: 'Confirmation rapide',
      description: 'Recevez une confirmation immédiate'
    },
    {
      icon: Users,
      title: 'Groupes bienvenus',
      description: 'Accueil chaleureux pour tous les groupes'
    },
    {
      icon: Star,
      title: 'Service premium',
      description: 'Un service attentionné et professionnel'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center text-white w-full px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 font-serif"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Réserver une table
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto text-gray-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Réservez votre place pour une expérience culinaire unique
          </motion.p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de réservation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ReservationForm onSuccess={handleReservationSuccess} />
          </motion.div>

          {/* Informations complémentaires */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Horaires d'ouverture */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-amber-600" size={24} />
                Horaires d&apos;ouverture
              </h3>
              <div className="space-y-2">
                {openingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{item.day}</span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="text-amber-600" size={24} />
                Contact rapide
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-500" />
                  <span className="text-gray-700">{restaurantInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-500" />
                  <span className="text-gray-700">{restaurantInfo.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-500 mt-1" />
                  <span className="text-gray-700">{restaurantInfo.address}</span>
                </div>
              </div>
            </div>

            {/* Avantages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pourquoi réserver chez nous ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Message de succès */}
        {showSuccess && (
          <motion.div
            className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Réservation envoyée avec succès !</span>
            </div>
          </motion.div>
        )}

        {/* Section CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Questions ou demandes spéciales ?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            N&apos;hésitez pas à nous contacter directement par téléphone ou WhatsApp 
            pour toute demande particulière ou pour des groupes importants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open(`tel:${restaurantInfo.phone}`, '_self')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Appeler maintenant
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, j'ai une question concernant une réservation`, '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 