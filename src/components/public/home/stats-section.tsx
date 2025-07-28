"use client";

import { motion } from 'framer-motion';

export const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Clients satisfaits" },
    { value: "15+", label: "Spécialités" },
    { value: "8", label: "Années d'expérience" },
    { value: "4.8★", label: "Note moyenne" }
  ];

  return (
    <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-2xl py-10 px-2 bg-white/5 hover:bg-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-5xl md:text-6xl font-extrabold mb-2 font-serif drop-shadow-lg">{stat.value}</span>
              <span className="text-lg md:text-xl text-amber-100 font-light tracking-wide">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 