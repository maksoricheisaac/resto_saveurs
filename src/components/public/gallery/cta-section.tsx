export const CtaSection = () => {
  const handleReservationClick = () => {
    window.open(`https://wa.me/${'+242061234567'}?text=Bonjour, je souhaite réserver une table`, '_blank');
  };

  return (
    <div className="hero-gradient text-white rounded-2xl p-16 text-center mt-20 relative overflow-hidden">
      <div className="absolute inset-0 african-pattern"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-6">Venez découvrir notre ambiance !</h2>
        <div className="section-divider w-24 mx-auto mb-6"></div>
        <p className="text-xl mb-10">
          Réservez votre table et vivez l&apos;expérience Resto Saveurs
        </p>
        <button 
          onClick={handleReservationClick}
          className="bg-white text-orange-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Réserver maintenant
        </button>
      </div>
    </div>
  );
}; 