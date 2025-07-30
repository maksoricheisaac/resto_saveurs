"use client";
import { Award, Users, Utensils } from "lucide-react"
import { motion } from 'framer-motion';

export const Features = () => {
    return (
        <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 font-serif tracking-tight drop-shadow-sm">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Une expérience culinaire unique qui célèbre la richesse de la culture congolaise
            </p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
          >
            {/* Feature 1 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Utensils className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Cuisine Authentique</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Plats traditionnels congolais préparés avec des ingrédients frais et des recettes ancestrales
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Users className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Ambiance Conviviale</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Un cadre chaleureux et accueillant où chacun se sent comme en famille
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Award className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Excellence Reconnue</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Une réputation d&apos;excellence bâtie sur la qualité et la satisfaction de nos clients
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
}