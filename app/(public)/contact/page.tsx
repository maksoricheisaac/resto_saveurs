/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
// import { useRestaurant } from '@/context/RestaurantContext';
import { restaurantInfo } from '@/data/restaurant';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PhoneInput } from '@/components/phone-input';

const Contact = () => {
  // const { addContactMessage } = useRestaurant();

  const formSchema = z.object({
    name: z.string().min(2, { message: 'Le nom est requis' }),
    email: z.string().email({ message: 'Email invalide' }),
    phone: z.string().optional(),
    message: z.string().min(5, { message: 'Le message est requis' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  }

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite vous contacter`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero avec image de fond */}
      <section className="relative h-[38vh] md:h-[48vh] flex items-center justify-center overflow-hidden mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 font-serif"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto text-gray-100 font-light drop-shadow-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            Nous sommes à votre écoute pour toute question ou réservation.
          </motion.p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Informations de contact</h2>
            
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">{restaurantInfo.address}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">{restaurantInfo.phone}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{restaurantInfo.email}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Horaires d'ouverture</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="font-medium">{day}</span>
                          <span>{hours as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* WhatsApp Button */}
            <button 
              onClick={handleWhatsAppClick}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Contacter sur WhatsApp</span>
            </button>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Envoyez-nous un message</h2>
            <Card className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Message envoyé !</h3>
                  <p className="text-gray-600">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <PhoneInput type="tel" placeholder="+242 XX XXX XX XX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea rows={5} placeholder="Votre message..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </Button>
                  </form>
                </Form>
              )}
            </Card>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Plan d'accès</h2>
          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8521234567!2d15.2429!3d-4.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTUnNDguMiJTIDE1wrAxNCczMi40IkU!5e0!3m2!1sfr!2scg!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;