"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Bell, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Veuillez saisir votre email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Veuillez saisir un email valide');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'envoi - à remplacer par votre API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Offres exclusives',
      description: 'Recevez en avant-première nos promotions spéciales'
    },
    {
      icon: Bell,
      title: 'Nouveautés',
      description: 'Soyez informés de nos nouveaux plats et événements'
    },
    {
      icon: Mail,
      title: 'Conseils culinaires',
      description: 'Découvrez nos recettes et astuces de cuisine'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Restez connecté avec nous
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives, 
              nouveautés culinaires et conseils gastronomiques
            </p>
          </motion.div>

          {/* Formulaire d'inscription */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        className="bg-white/90 border-0 text-gray-900 placeholder-gray-600 h-12 text-lg"
                        disabled={isSubmitting}
                      />
                      {error && (
                        <p className="text-red-400 text-sm mt-2">{error}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 h-12 text-lg whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Inscription...
                        </div>
                      ) : (
                        'S\'inscrire'
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    className="flex items-center justify-center gap-3 text-green-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={24} />
                    <span className="text-lg font-semibold">
                      Inscription réussie ! Vérifiez votre email.
                    </span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Avantages */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Garantie */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-gray-400 text-sm">
              🔒 Vos données sont protégées. Désinscription possible à tout moment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 