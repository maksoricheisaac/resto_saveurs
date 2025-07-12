import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { restaurantInfo } from '@/data/restaurant';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <h3 className="text-xl font-bold">{restaurantInfo.name}</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Découvrez les saveurs authentiques du Congo dans une ambiance chaleureuse et conviviale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-500 mt-1" />
                <span className="text-gray-400 text-sm">{restaurantInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                <span className="text-gray-400 text-sm">{restaurantInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                <span className="text-gray-400 text-sm">{restaurantInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <div className="space-y-2">
              {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{day}</span>
                  <span className="text-gray-300">{hours as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Accueil
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-orange-500 transition-colors text-sm">
                À propos
              </Link>
              <Link href="/menu" className="block text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Menu
              </Link>
              <Link href="/gallery" className="block text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Galerie
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {restaurantInfo.name}. Tous droits réservés. | 
            <span className="text-orange-500"> Restaurant africain Brazzaville</span> | 
            <span className="text-orange-500"> Cuisine locale Congo</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;