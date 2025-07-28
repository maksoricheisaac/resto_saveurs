"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mama Ngozi",
      role: "Chef Exécutive",
      description: "Gardienne de nos recettes ancestrales, elle apporte 25 ans d'expérience culinaire",
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
    },
    {
      name: "Chef Moïse",
      role: "Sous-Chef",
      description: "Spécialiste des grillades et des plats de poisson, il maîtrise l'art des épices",
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
    },
    {
      name: "Grace",
      role: "Responsable Service",
      description: "Elle veille à ce que chaque client vive une expérience mémorable",
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
    }
  ];

  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.18 }
        }
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-12 font-serif text-orange-600">Notre Équipe</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="text-center bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
          >
            <div className="h-64 bg-gray-200 overflow-hidden">
              <Image
                width={500}
                height={500}
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">{member.name}</h3>
              <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 font-light">
                {member.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 