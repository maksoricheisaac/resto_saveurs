import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  ListOrdered, 
  MessageSquare, 
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalMenuItems: number;
    totalCategories: number;
    totalMessages: number;
    totalSideDishes: number;
    dailySpecials: number;
    totalRevenue?: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Plats",
      value: stats.totalMenuItems,
      icon: UtensilsCrossed,
      description: "Plats disponibles",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Accompagnements",
      value: stats.totalSideDishes,
      icon: UtensilsCrossed,
      description: "Accompagnements disponibles",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Catégories",
      value: stats.totalCategories,
      icon: ListOrdered,
      description: "Catégories actives",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      description: "Messages non lus",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Plats du Jour",
      value: stats.dailySpecials,
      icon: TrendingUp,
      description: "Plats spéciaux",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Revenus",
      value: stats.totalRevenue ? `${stats.totalRevenue.toFixed(2)} €` : "N/A",
      icon: DollarSign,
      description: "Revenus totaux",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {card.value}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 