import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { restaurantInfo } from '@/data/restaurant';

interface ContactInfoProps {
  onWhatsAppClick: () => void;
}

export const ContactInfo = ({ onWhatsAppClick }: ContactInfoProps) => {
  return (
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
              <h3 className="font-semibold text-gray-900 mb-2">Horaires d&apos;ouverture</h3>
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
        onClick={onWhatsAppClick}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <MessageCircle size={20} />
        <span>Contacter sur WhatsApp</span>
      </button>
    </div>
  );
}; 