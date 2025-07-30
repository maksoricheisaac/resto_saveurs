"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getMessages } from '@/actions/admin/message-actions';

export function MessageStats() {
  const [stats, setStats] = useState<{
    total: number | undefined;
    unread: number | undefined;
    read: number | undefined;
  }>({
    total: 0,
    unread: 0,
    read: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [totalResult, unreadResult, readResult] = await Promise.all([
        getMessages({ filter: 'all', limit: 1 }),
        getMessages({ filter: 'unread', limit: 1 }),
        getMessages({ filter: 'read', limit: 1 }),
      ]);

      setStats({
        total: totalResult.data?.success ? totalResult.data.data?.total : 0,
        unread: unreadResult.data?.success ? unreadResult.data.data?.total : 0,
        read: readResult.data?.success ? readResult.data.data?.total : 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Total Messages
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
          <p className="text-xs text-blue-600 mt-1">
            Messages reçus
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            Non Lus
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800">{stats.unread}</div>
          <p className="text-xs text-orange-600 mt-1">
            En attente de lecture
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Lus
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">{stats.read}</div>
          <p className="text-xs text-green-600 mt-1">
            Messages traités
          </p>
        </CardContent>
      </Card>
    </div>
  );
}