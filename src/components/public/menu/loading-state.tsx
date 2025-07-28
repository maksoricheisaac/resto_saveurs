export const LoadingState = () => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Chargement du menu...</h3>
      <p className="text-gray-600">
        Veuillez patienter pendant que nous récupérons nos délicieux plats.
      </p>
    </div>
  );
}; 