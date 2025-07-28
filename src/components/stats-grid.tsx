import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color: 'amber' | 'blue' | 'green' | 'purple' | 'rose' | 'cyan';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    icon: 'text-amber-600',
    title: 'text-amber-700',
    value: 'text-amber-800',
    description: 'text-amber-600',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    icon: 'text-blue-600',
    title: 'text-blue-700',
    value: 'text-blue-800',
    description: 'text-blue-600',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    icon: 'text-green-600',
    title: 'text-green-700',
    value: 'text-green-800',
    description: 'text-green-600',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
    icon: 'text-purple-600',
    title: 'text-purple-700',
    value: 'text-purple-800',
    description: 'text-purple-600',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
    icon: 'text-rose-600',
    title: 'text-rose-700',
    value: 'text-rose-800',
    description: 'text-rose-600',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-50 to-teal-50',
    icon: 'text-cyan-600',
    title: 'text-cyan-700',
    value: 'text-cyan-800',
    description: 'text-cyan-600',
  },
};

export function StatCard({ title, value, description, icon: Icon, color, trend }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${colors.bg}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${colors.title}`}>{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colors.icon} group-hover:scale-110 transition-transform`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colors.value}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <p className={`text-xs ${colors.description} mt-1`}>{description}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-gray-500">vs mois dernier</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: StatCardProps[];
  columns?: 1 | 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 3 }: StatsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
