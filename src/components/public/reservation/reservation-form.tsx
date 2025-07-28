"use client";

import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { restaurantInfo } from '@/data/restaurant';
import type { ReservationFormData } from '@/types';
import { PhoneInput } from '@/components/phone-input';

interface ReservationFormProps {
  onSuccess?: () => void;
  className?: string;
}

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ReservationForm = ({ onSuccess, className = "" }: ReservationFormProps) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.time) newErrors.time = 'L\'heure est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi - à remplacer par votre API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Envoyer aussi sur WhatsApp
      const whatsappMessage = `Nouvelle réservation:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Date: ${formData.date}
Heure: ${formData.time}
Nombre de personnes: ${formData.guests}
Demandes spéciales: ${formData.specialRequests || 'Aucune'}`;

      window.open(
        `https://wa.me/${restaurantInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank'
      );

      onSuccess?.();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Erreur réservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReservationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Réserver une table
        </CardTitle>
        <p className="text-gray-600">
          Réservez votre table en quelques clics
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} />
              Nom complet *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Votre nom complet"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail size={16} />
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone size={16} />
              Téléphone *
            </label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              placeholder="+242 06 123 45 67"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Date et Heure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} />
                Date *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={getMinDate()}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} />
                Heure *
              </label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger className={errors.time ? 'border-red-500 w-full' : 'w-full'}>
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>
          </div>

          {/* Nombre de personnes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users size={16} />
              Nombre de personnes
            </label>
            <Select value={formData.guests.toString()} onValueChange={(value) => handleInputChange('guests', parseInt(value))}>
              <SelectTrigger className={errors.guests ? 'border-red-500 w-full' : 'w-full'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {guestOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Demandes spéciales */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} />
              Demandes spéciales
            </label>
            <Textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Allergies, préférences, occasion spéciale..."
              rows={3}
            />
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Réservation en cours...
              </div>
            ) : (
              'Confirmer la réservation'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Votre réservation sera confirmée par email et WhatsApp
          </p>
        </form>
      </CardContent>
    </Card>
  );
}; 