/* eslint-disable react/no-unescaped-entities */
"use client";
import { Card } from '@/components/ui/card';
import { List, MessageCircle, Utensils } from 'lucide-react';

// Mock data
const stats = {
  plats: 12,
  categories: 4,
  messages: 7,
};

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 font-serif">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 flex flex-col items-center text-center">
          <Utensils className="text-amber-600 mb-2" size={32} />
          <div className="text-4xl font-extrabold text-amber-700 mb-1">{stats.plats}</div>
          <div className="text-lg font-semibold">Plats</div>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <List className="text-amber-600 mb-2" size={32} />
          <div className="text-4xl font-extrabold text-amber-700 mb-1">{stats.categories}</div>
          <div className="text-lg font-semibold">Catégories</div>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <MessageCircle className="text-amber-600 mb-2" size={32} />
          <div className="text-4xl font-extrabold text-amber-700 mb-1">{stats.messages}</div>
          <div className="text-lg font-semibold">Messages</div>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-12 font-serif">Schémas Zod</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 bg-gray-50">
          <div className="font-semibold mb-2">Plat</div>
          <pre className="text-xs bg-gray-100 rounded p-4 overflow-x-auto"><code>{`const menuSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.coerce.number().min(1),
  image: z.string().url(),
  category: z.string().min(1),
});`}</code></pre>
        </Card>
        <Card className="p-6 bg-gray-50">
          <div className="font-semibold mb-2">Catégorie</div>
          <pre className="text-xs bg-gray-100 rounded p-4 overflow-x-auto"><code>{`const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});`}</code></pre>
        </Card>
        <Card className="p-6 bg-gray-50">
          <div className="font-semibold mb-2">Message</div>
          <pre className="text-xs bg-gray-100 rounded p-4 overflow-x-auto"><code>{`const messageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  date: z.string(),
});`}</code></pre>
        </Card>
      </div>
    </div>
  );
} 