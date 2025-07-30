import { getPublicMenuItems } from '@/actions/public/menu-action';
import { MenuItem } from '@/types';
import { Hero } from '@/components/public/home/hero';
import { WelcomeSection } from '@/components/public/home/welcome-section';
import { Features } from '@/components/public/home/features';
import { DailySpecials } from '@/components/public/home/daily-specials';
import { StatsSection } from '@/components/public/home/stats-section';
import { TestimonialsSection } from '@/components/public/home/testimonials-section';
import { FeaturedMenu } from '@/components/public/home/featured-menu';
import { CtaSection } from '@/components/public/home/cta-section';

export default async function Home() {
  const menuResult = await getPublicMenuItems();


  const transformedMenuItems: MenuItem[] = (menuResult?.data?.menuItems || []).map(item => ({
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

  const deailySpecials = transformedMenuItems
    .filter((item: MenuItem) => item.isDailySpecial && item.isAvailable)
    .slice(0,3);

  const featuredItems = transformedMenuItems
    .filter((item: MenuItem) => !item.isDailySpecial && item.isAvailable)
    .slice(0,3);


  return <div className="min-h-screen">
      <Hero />
      <WelcomeSection />
      <Features />
      <DailySpecials dailySpecials={deailySpecials} />
      <FeaturedMenu featuredItems={featuredItems} />
      <StatsSection />
      <TestimonialsSection />
      
      <CtaSection />
    </div>
}

