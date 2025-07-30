"use client";

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const events = [
  {
    id: '1',
    title: 'Soirée Spéciale Congo',
    description: 'Une soirée exceptionnelle pour découvrir les saveurs authentiques du Congo avec notre chef spécialiste.',
    date: '15 Décembre 2024',
    time: '19:00 - 23:00',
    location: 'Restaurant Saveurs',
    capacity: '50 personnes',
    image: '/fallback.png',
    price: '75€',
    isUpcoming: true
  },
  {
    id: '2',
    title: 'Atelier Cuisine Africaine',
    description: 'Apprenez à cuisiner les plats traditionnels africains avec nos chefs expérimentés.',
    date: '22 Décembre 2024',
    time: '14:00 - 17:00',
    location: 'Cuisine du restaurant',
    capacity: '12 personnes',
    image: '/fallback.png',
    price: '45€',
    isUpcoming: true
  },
  {
    id: '3',
    title: 'Dégustation de Vins',
    description: 'Découvrez les meilleurs accords mets-vins avec nos spécialités africaines.',
    date: '29 Décembre 2024',
    time: '20:00 - 22:00',
    location: 'Salle privée',
    capacity: '25 personnes',
    image: '/fallback.png',
    price: '60€',
    isUpcoming: true
  }
];

export const EventsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Nos Événements & Actualités
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos événements spéciaux, ateliers culinaires et soirées thématiques 
            pour vivre une expérience gastronomique unique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.isUpcoming && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        À venir
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.price}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-2" />
                      {event.capacity}
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-amber-600 transition-colors">
                    Réserver ma place
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            Voir tous nos événements
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};