"use client"
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import { restaurantInfo } from '../../data/restaurant';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Galerie', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite faire une réservation`, '_blank');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>{restaurantInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span>Lun-Dim: 11h00-22h00</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin size={14} />
              <span>Brazzaville, République du Congo</span>
            </div>
          </div>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-xs font-medium transition-colors"
          >
            Réserver sur WhatsApp
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Saveurs du Congo</h1>
                <p className="text-sm text-gray-600">Restaurant Africain</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-medium transition-colors relative group ${
                    pathname === item.path 
                      ? 'text-amber-600' 
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                    pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={handleWhatsAppClick}
                className="btn-primary"
              >
                Réserver
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container-custom py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block py-3 font-medium transition-colors ${
                    pathname === item.path 
                      ? 'text-amber-600' 
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleWhatsAppClick}
                className="btn-primary w-full mt-4"
              >
                Réserver sur WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;