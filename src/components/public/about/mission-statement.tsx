"use client";

import { motion } from 'framer-motion';

export const MissionStatement = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-12 text-center shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      <h2 className="text-3xl font-bold mb-6 font-serif drop-shadow-lg">Notre Mission</h2>
      <p className="text-xl max-w-4xl mx-auto font-light">
        Faire découvrir et apprécier la richesse de la cuisine congolaise en offrant une expérience culinaire authentique, dans un cadre chaleureux qui célèbre notre culture et nos traditions, tout en créant des liens durables avec notre communauté.
      </p>
    </motion.div>
  );
}; 