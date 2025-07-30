import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  ListOrdered, 
  MessageSquare, 
  Plus,
  Settings,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardStats } from '@/actions/admin/dashboard-actions';

export default async function AdminDashboard() {
  const statsResult = await getDashboardStats();
  const stats = statsResult.success ? statsResult.data : {
    totalMenuItems: 0,
    totalCategories: 0,
    totalMessages: 0,
    dailySpecials: 0,
    totalSideDishes: 0,
    unreadMessages: 0
  };

  return (
    <div className="space-y-8">
      {/* En-tête du dashboard */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Tableau de Bord
        </h1>
        <p className="text-gray-600">
          Gérez votre restaurant et suivez vos performances
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">
              Plats du Menu
            </CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">{stats?.totalMenuItems}</div>
            <p className="text-xs text-amber-600 mt-1">
              Plats disponibles
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Catégories
            </CardTitle>
            <ListOrdered className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{stats?.totalCategories}</div>
            <p className="text-xs text-green-600 mt-1">
              Catégories actives
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{stats?.unreadMessages}</div>
            <p className="text-xs text-blue-600 mt-1">
              Messages non lus
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <UtensilsCrossed className="h-5 w-5 text-amber-600" />
              Gestion du Menu
            </CardTitle>
            <p className="text-sm text-gray-600">
              Ajoutez, modifiez ou supprimez des plats du menu
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/admin/menu">
                <Plus className="h-4 w-4 mr-2" />
                Gérer le Menu
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <ListOrdered className="h-5 w-5 text-green-600" />
              Catégories
            </CardTitle>
            <p className="text-sm text-gray-600">
              Organisez vos plats par catégories
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/admin/categories">
                <Plus className="h-4 w-4 mr-2" />
                Gérer les Catégories
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Messages Clients
            </CardTitle>
            <p className="text-sm text-gray-600">
              Consultez et répondez aux messages
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Voir les Messages
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Plats du Jour
            </CardTitle>
            <p className="text-sm text-gray-600">
              Configurez vos plats spéciaux quotidiens ({stats?.dailySpecials} actifs)
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/menu">
                <Settings className="h-4 w-4 mr-2" />
                Configurer
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Section d'aide rapide */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-900">Aide Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pour commencer :</h4>
              <ul className="space-y-1">
                <li>• Créez vos catégories de plats</li>
                <li>• Ajoutez vos plats au menu</li>
                <li>• Configurez vos plats du jour</li>
                <li>• Répondez aux messages clients</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Conseils :</h4>
              <ul className="space-y-1">
                <li>• Utilisez des images de qualité</li>
                <li>• Rédigez des descriptions attractives</li>
                <li>• Répondez rapidement aux messages</li>
                <li>• Mettez à jour régulièrement votre menu</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 