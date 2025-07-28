import { DashboardHeader, StatsGrid, QuickActions } from '@/components/admin/dashboard';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid />
        <QuickActions />
      </main>
    </div>
  );
} 