"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
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
import { createContactMessage } from '@/actions/public/contact-actions';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom est requis' }),
  email: z.string().email({ message: 'Email invalide' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

export const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const result = await createContactMessage(values);
      
      if (result.data?.success) {
        toast.success('Message envoyé avec succès !');
        form.reset();
      } else {
        toast.error(result.data?.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Envoyez-nous un message</h2>
      <Card className="p-8">
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
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Envoyer le message</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}; 