import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Category, GalleryImage, ContactMessage } from '../types';
import { initialMenuItems, initialCategories, initialGalleryImages } from '../data/restaurant';

interface RestaurantContextType {
  menuItems: MenuItem[];
  categories: Category[];
  galleryImages: GalleryImage[];
  contactMessages: ContactMessage[];
  isAdmin: boolean;
  
  // Admin functions
  login: (password: string) => boolean;
  logout: () => void;
  
  // Menu management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  
  // Category management
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Gallery management
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;
  
  // Contact management
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMenuItems = localStorage.getItem('restaurant-menu-items');
    const savedCategories = localStorage.getItem('restaurant-categories');
    const savedGalleryImages = localStorage.getItem('restaurant-gallery');
    const savedContactMessages = localStorage.getItem('restaurant-messages');
    const savedAuthState = localStorage.getItem('restaurant-admin-auth');

    setMenuItems(savedMenuItems ? JSON.parse(savedMenuItems) : initialMenuItems);
    setCategories(savedCategories ? JSON.parse(savedCategories) : initialCategories);
    setGalleryImages(savedGalleryImages ? JSON.parse(savedGalleryImages) : initialGalleryImages);
    setContactMessages(savedContactMessages ? JSON.parse(savedContactMessages) : []);
    setIsAdmin(savedAuthState === 'true');
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('restaurant-menu-items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('restaurant-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('restaurant-gallery', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('restaurant-messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('restaurant-admin-auth', isAdmin.toString());
  }, [isAdmin]);

  const login = (password: string): boolean => {
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString()
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(menuItem => 
      menuItem.id === id ? { ...menuItem, ...item } : menuItem
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...category } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Also remove menu items in this category
    setMenuItems(prev => prev.filter(item => item.category !== id));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString()
    };
    setGalleryImages(prev => [...prev, newImage]);
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  const addContactMessage = (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      isRead: false
    };
    setContactMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (id: string) => {
    setContactMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <RestaurantContext.Provider value={{
      menuItems,
      categories,
      galleryImages,
      contactMessages,
      isAdmin,
      login,
      logout,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addCategory,
      updateCategory,
      deleteCategory,
      addGalleryImage,
      deleteGalleryImage,
      addContactMessage,
      markMessageAsRead,
      deleteContactMessage
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};