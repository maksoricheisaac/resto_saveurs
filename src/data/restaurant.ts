import { RestaurantInfo, MenuItem, Category, GalleryImage } from '@/types';

export const restaurantInfo: RestaurantInfo = {
  name: "Saveurs du Congo",
  address: "Avenue Amical Cabral, Brazzaville, République du Congo",
  phone: "+242 06 123 45 67",
  email: "contact@saveursducongo.com",
  hours: {
    "Lundi": "11h00 - 22h00",
    "Mardi": "11h00 - 22h00",
    "Mercredi": "11h00 - 22h00",
    "Jeudi": "11h00 - 22h00",
    "Vendredi": "11h00 - 23h00",
    "Samedi": "11h00 - 23h00",
    "Dimanche": "12h00 - 22h00"
  },
  location: {
    lat: -4.2634,
    lng: 15.2429
  },
  whatsapp: "+242061234567"
};

export const initialCategories: Category[] = [
  {
    id: "1",
    name: "Entrées",
    description: "Pour bien commencer votre repas",
    order: 1
  },
  {
    id: "2",
    name: "Plats Principaux",
    description: "Nos spécialités congolaises",
    order: 2
  },
  {
    id: "3",
    name: "Accompagnements",
    description: "Pour accompagner vos plats",
    order: 3
  },
  {
    id: "4",
    name: "Desserts",
    description: "Douceurs pour terminer",
    order: 4
  },
  {
    id: "5",
    name: "Boissons",
    description: "Boissons locales et internationales",
    order: 5
  },
  // Catégorie ajoutée
  {
    id: "6",
    name: "Soupes",
    description: "Soupes traditionnelles et réconfortantes",
    order: 6
  },
  {
    id: "7",
    name: "Grillades",
    description: "Viandes et poissons grillés à la braise",
    order: 7
  }
];

export const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Salade de Malanga",
    description: "Salade fraîche de malanga aux épices locales",
    price: 2500,
    category: "1",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
    isAvailable: true
  },
  {
    id: "2",
    name: "Ngai Ngai",
    description: "Délicieux plat de feuilles de manioc mijoté avec viande fumée",
    price: 4500,
    category: "2",
    image: "https://images.pexels.com/photos/5718019/pexels-photo-5718019.jpeg",
    isAvailable: true
  },
  {
    id: "3",
    name: "Poulet Moambé",
    description: "Poulet mijoté dans une sauce d'arachides et épices",
    price: 5000,
    category: "2",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    isAvailable: true
  },
  {
    id: "4",
    name: "Poisson Capitaine Grillé",
    description: "Poisson frais du Congo grillé aux épices",
    price: 6000,
    category: "2",
    image: "https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg",
    isAvailable: true
  },
  {
    id: "5",
    name: "Fufu de Banane",
    description: "Accompagnement traditionnel à base de banane plantain",
    price: 1500,
    category: "3",
    image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg",
    isAvailable: true
  },
  {
    id: "6",
    name: "Kwanga",
    description: "Pain traditionnel congolais à base de manioc",
    price: 1000,
    category: "3",
    image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg",
    isAvailable: true
  },
  {
    id: "7",
    name: "Beignets de Banane",
    description: "Beignets sucrés à la banane plantain",
    price: 2000,
    category: "4",
    image: "https://images.pexels.com/photos/4099267/pexels-photo-4099267.jpeg",
    isAvailable: true
  },
  {
    id: "8",
    name: "Jus de Gingembre",
    description: "Boisson rafraîchissante au gingembre frais",
    price: 1500,
    category: "5",
    image: "https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg",
    isAvailable: true
  },
  {
    id: "9",
    name: "Primus",
    description: "Bière locale congolaise",
    price: 1200,
    category: "5",
    image: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg",
    isAvailable: true
  },
  {
    id: "10",
    name: "Soupe de Poisson Fumé",
    description: "Soupe épicée à base de poisson fumé et légumes locaux",
    price: 3500,
    category: "6",
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
    isAvailable: true
  },
  {
    id: "11",
    name: "Soupe de Gombo",
    description: "Soupe onctueuse de gombo, viande et épices du Congo",
    price: 3200,
    category: "6",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
    isAvailable: true
  },
  {
    id: "12",
    name: "Brochettes de Bœuf",
    description: "Bœuf mariné grillé à la braise, servi avec sauce piquante",
    price: 4000,
    category: "7",
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
    isAvailable: true
  },
  {
    id: "13",
    name: "Grillade de Tilapia",
    description: "Tilapia entier grillé, accompagné de légumes frais",
    price: 5500,
    category: "7",
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
    isAvailable: true
  },
  {
    id: "14",
    name: "Pondu aux Cacahuètes",
    description: "Feuilles de manioc mijotées avec pâte d'arachide et viande",
    price: 4800,
    category: "2",
    image: "https://images.pexels.com/photos/5718019/pexels-photo-5718019.jpeg",
    isAvailable: true
  },
  {
    id: "15",
    name: "Tarte à la Mangue",
    description: "Tarte sucrée à la mangue fraîche du pays",
    price: 2200,
    category: "4",
    image: "https://images.pexels.com/photos/4099267/pexels-photo-4099267.jpeg",
    isAvailable: true
  }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    alt: "Poulet Moambé traditionnel",
    category: "food"
  },
  {
    id: "2",
    url: "https://images.pexels.com/photos/5718019/pexels-photo-5718019.jpeg",
    alt: "Plat de légumes locaux",
    category: "food"
  },
  {
    id: "3",
    url: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg",
    alt: "Ambiance chaleureuse du restaurant",
    category: "ambiance"
  },
  {
    id: "4",
    url: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    alt: "Salle de restaurant africain",
    category: "ambiance"
  },
  {
    id: "5",
    url: "https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg",
    alt: "Poisson grillé aux épices",
    category: "food"
  },
  {
    id: "6",
    url: "https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg",
    alt: "Événement culturel au restaurant",
    category: "event"
  }
];