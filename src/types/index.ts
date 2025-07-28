// Types pour l'application restaurant
export * from './category';
export * from './message';

// Types principaux de l'application
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isDailySpecial?: boolean;
  preparationTime?: string;
  allergens?: string;
  createdAt?: Date;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: 'food' | 'ambiance' | 'event';
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  isRead: boolean;
};

export type RestaurantInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: Record<string, string>;
  location: {
    lat: number;
    lng: number;
  };
};

// Types pour l'authentification
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
};

// Types pour les réservations
export type Reservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  time: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
};


export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
  image?: string;
}



export interface NewsletterSubscription {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

// Types pour les commandes
export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialRequests?: string;
};

// Types pour les événements
export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number; // en minutes
  maxGuests: number;
  currentGuests: number;
  price: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Types pour les avis clients
export type Review = {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  comment: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Types pour les promotions
export type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  applicableCategories: string[];
  minimumOrderAmount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};