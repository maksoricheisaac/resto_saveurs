export const HeroBanner = () => {
  return (
    <section className="relative h-[38vh] md:h-[48vh] flex items-center justify-center overflow-hidden mb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 font-serif">Notre Menu</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-100 font-light drop-shadow-md">
          Découvrez nos spécialités congolaises préparées avec passion et des ingrédients frais
        </p>
      </div>
    </section>
  );
}; 