"use client";

import { useState, useEffect } from 'react';
import { getPublicMenuItems } from '@/actions/public/menu-action';
import { MenuItem } from '@/types';
import { Hero } from '@/components/public/home/hero';
import { Features } from '@/components/public/home/features';
import { DailySpecials } from '@/components/public/menu/daily-specials';
import { FeaturedMenu } from '@/components/public/home/featured-menu';
import { StatsSection } from '@/components/public/home/stats-section';
import { TestimonialsSection } from '@/components/public/home/testimonials-section';
import { NewsletterSection } from '@/components/public/home/newsletter-section';
import { CtaSection } from '@/components/public/home/cta-section';

export default function HomeClient() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis la base de données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const menuResult = await getPublicMenuItems();

        if (menuResult.success) {
          const transformedMenuItems = (menuResult?.data || []).map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image || '',
            category: item.category.name,
            isAvailable: item.isAvailable,
            isDailySpecial: item.isDailySpecial,
            createdAt: item.createdAt,
          }));
          setMenuItems(transformedMenuItems);
        }
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les plats spéciaux du jour
  const dailySpecials = menuItems.filter((item: MenuItem) => 
    item.isDailySpecial && item.isAvailable
  );

  // Filtrer les plats mis en avant (non spéciaux)
  const featuredItems = menuItems
    .filter((item: MenuItem) => !item.isDailySpecial && item.isAvailable)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Menu du Jour */}
      {!loading && <DailySpecials dailySpecials={dailySpecials} />}

      {/* Featured Menu Items */}
      <FeaturedMenu featuredItems={featuredItems} />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
} 