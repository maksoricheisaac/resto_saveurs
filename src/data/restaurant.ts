import { RestaurantInfo, GalleryImage } from '@/types';

export const restaurantInfo: RestaurantInfo = {
  name: "Resto Saveurs",
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