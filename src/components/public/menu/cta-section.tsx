import { restaurantInfo } from '@/data/restaurant';

export const CtaSection = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite passer une commande`, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-12 text-center mt-16">
      <h2 className="text-3xl font-bold mb-4">Envie de commander ?</h2>
      <p className="text-xl mb-8 text-amber-100">
        Contactez-nous sur WhatsApp pour passer votre commande ou réserver votre table
      </p>
      <button 
        onClick={handleWhatsAppClick}
        className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Commander sur WhatsApp
      </button>
    </div>
  );
}; 