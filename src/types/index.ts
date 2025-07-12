export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'food' | 'ambiance' | 'event';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  whatsapp: string;
}