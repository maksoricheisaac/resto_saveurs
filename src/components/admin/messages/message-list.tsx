"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Eye, Trash2, Mail, Calendar } from 'lucide-react';
import { Message } from '@/types/message';

interface MessageListProps {
  messages: Message[];
  selected: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MessageList({ messages, selected, onSelect, onDelete }: MessageListProps) {
  function getStatusBadge(status: string) {
    switch (status) {
      case 'non-lu':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Non lu</Badge>;
      case 'lu':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Lu</Badge>;
      case 'repondu':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Répondu</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-amber-600" />
          Boîte de réception ({messages.length})
        </CardTitle>
        <CardDescription>Messages reçus de vos clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Aucun message reçu</p>
              <p className="text-sm">Les messages de vos clients apparaîtront ici</p>
            </div>
          ) : (
            messages.map(msg => (
              <div 
                key={msg.id} 
                className={`group p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
                  selected === msg.id 
                    ? 'border-amber-300 bg-amber-50 shadow-md' 
                    : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                }`}
                onClick={() => onSelect(msg.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                      {getStatusBadge(msg.status)}
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{msg.email}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{msg.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(msg.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => { e.stopPropagation(); onSelect(msg.id); }}
                      className="border-gray-300 hover:bg-amber-50 hover:border-amber-300"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={(e) => { e.stopPropagation(); onDelete(msg.id); }}
                      className="hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 