"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, User, Calendar, Mail, Reply, CheckCircle } from 'lucide-react';
import { Message } from '@/types/message';
import { markMessageAsRead } from '@/actions/admin/message-actions';
import { toast } from 'sonner';

interface MessageDetailProps {
  message: Message | null;
  onClose: () => void;
  onUpdateMessage?: (messageId: string, updates: Partial<Message>) => void;
}

export function MessageDetail({ message, onClose, onUpdateMessage }: MessageDetailProps) {
 
  const handleMarkAsRead = async () => {
    if (!message || message.isRead) return;
    
    try {
      const result = await markMessageAsRead({ messageId: message.id });
      if (result.data?.success) {
        toast.success('Message marqué comme lu');
        if (onUpdateMessage) {
          onUpdateMessage(message.id, { isRead: true });
        }
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    }
  };

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

  if (!message) {
    return (
      <Card className="border-0 shadow-md border-dashed border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Eye className="h-12 w-12 mb-3 text-gray-300" />
          <p className="text-lg font-medium">Sélectionnez un message</p>
          <p className="text-sm text-center">Cliquez sur un message dans la liste pour voir ses détails</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Eye className="h-5 w-5 text-amber-600" />
          Détail du message
        </CardTitle>
        <CardDescription>Informations complètes du message</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{message.name}</h3>
              <p className="text-sm text-gray-600">{message.email}</p>
              {message.phone && (
                <p className="text-sm text-gray-600">{message.phone}</p>
              )}
            </div>
            <div className="ml-auto">
              {getStatusBadge(message.isRead ? 'lu' : 'non-lu')}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Reçu le {new Date(message.createdAt).toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>

          <Separator />

          {/* Message Content */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-600" />
              Contenu du message
            </h4>
            <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-amber-500 min-h-[120px]">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {message.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {!message.isRead && (
              <Button 
                variant="outline"
                onClick={handleMarkAsRead}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marquer comme lu
              </Button>
            )}
            <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
              <Reply className="h-4 w-4 mr-2" />
              Répondre
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              Fermer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 