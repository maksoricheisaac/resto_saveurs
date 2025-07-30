"use client";
import { motion } from 'framer-motion';
import { ChefHat, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    id: '1',
    question: 'Quels sont vos horaires d\'ouverture ?',
    answer: 'Nous sommes ouverts du mardi au dimanche de 12h00 à 14h30 pour le déjeuner et de 19h00 à 22h30 pour le dîner. Le restaurant est fermé le lundi.'
  },
  {
    id: '2',
    question: 'Acceptez-vous les réservations ?',
    answer: 'Oui, nous acceptons les réservations par téléphone, email ou via notre site web. Nous recommandons de réserver à l\'avance, surtout pour les weekends et les groupes.'
  },
  {
    id: '3',
    question: 'Proposez-vous des options végétariennes ?',
    answer: 'Absolument ! Nous avons plusieurs plats végétariens authentiques dans notre menu, préparés avec des ingrédients frais et locaux.'
  },
  {
    id: '4',
    question: 'Pouvez-vous accommoder les allergies alimentaires ?',
    answer: 'Oui, nos chefs peuvent adapter les plats selon vos allergies. Veuillez nous informer à l\'avance pour que nous puissions vous proposer les meilleures alternatives.'
  },
  {
    id: '5',
    question: 'Proposez-vous des menus pour groupes ou événements ?',
    answer: 'Oui, nous proposons des menus spéciaux pour les groupes et événements privés. Contactez-nous pour discuter de vos besoins spécifiques.'
  },
  {
    id: '6',
    question: 'Y a-t-il un parking disponible ?',
    answer: 'Nous disposons d\'un parking privé gratuit pour nos clients. Il est situé juste à côté du restaurant.'
  }
];

const quickInfo = [
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Mar-Dim: 12h-14h30 & 19h-22h30'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    content: '123 Rue de la Gastronomie, 75001 Paris'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '01 23 45 67 89'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@resto-saveurs.fr'
  }
];

export const FaqSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur notre restaurant, 
            nos services et nos spécialités culinaires
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border border-gray-200 rounded-lg px-6 py-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-amber-600 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          {/* Informations rapides */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <ChefHat className="w-6 h-6 mr-2 text-amber-600" />
                    Informations utiles
                  </h3>
                  
                  <div className="space-y-6">
                    {quickInfo.map((info, index) => (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {info.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Besoin d&apos;aide ?
                    </h4>
                    <p className="text-amber-700 text-sm mb-3">
                      Notre équipe est là pour vous aider et répondre à toutes vos questions.
                    </p>
                    <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors text-sm font-medium">
                      Nous contacter
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};