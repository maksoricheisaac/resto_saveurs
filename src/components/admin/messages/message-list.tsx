"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  Trash2, 
  CheckCircle,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { markMessageAsRead, deleteMessage, markAllMessagesAsRead } from '@/actions/admin/message-actions';
import { Message } from '@/types/message';

export interface MessageListProps {
  messages: Message[];
  selected: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateMessage?: (messageId: string, updates: Partial<Message>) => void;
}

export function MessageList({ messages, selected, onSelect, onDelete, onUpdateMessage }: MessageListProps) {
  // Nettoyage des hooks inutilisés
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilter: 'all' | 'unread' | 'read') => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (newDateFilter: string) => {
    setDateFilter(newDateFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllMessagesAsRead({});
      if (result.data?.success) {
        toast.success('Tous les messages marqués comme lus');
        // Mettre à jour l'état local
        messages.forEach(msg => {
          if (!msg.isRead && onUpdateMessage) {
            onUpdateMessage(msg.id, { isRead: true });
          }
        });
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const result = await markMessageAsRead({ messageId });
      if (result.data?.success) {
        toast.success('Message marqué comme lu');
        if (onUpdateMessage) {
          onUpdateMessage(messageId, { isRead: true });
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

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const result = await deleteMessage({ messageId });
      if (result.data?.success) {
        toast.success('Message supprimé');
        onDelete(messageId);
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filtrage local (optionnel, à adapter selon besoin)
  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'read') return msg.isRead;
    return true;
  }).filter(msg => {
    if (!dateFilter) return true;
    return msg.createdAt.startsWith(dateFilter);
  });

  return (
    <div className="space-y-6">
      {/* Filtres et actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les messages</SelectItem>
              <SelectItem value="unread">Non lus</SelectItem>
              <SelectItem value="read">Lus</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => handleDateFilterChange(e.target.value)}
              className="w-40"
              placeholder="Filtrer par date"
            />
            {dateFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDateFilterChange('')}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </Button>
            )}
          </div>
          
          {filter === 'unread' && messages.some(msg => !msg.isRead) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-600">
          {filteredMessages.length} message{filteredMessages.length > 1 ? 's' : ''} trouvé{filteredMessages.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Liste des messages */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun message
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Aucun message reçu pour le moment'
                  : filter === 'unread'
                  ? 'Aucun message non lu'
                  : 'Aucun message lu'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`border-0 shadow-lg transition-all duration-200 hover:shadow-xl ${
                !message.isRead ? 'bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500' : ''
              } ${selected === message.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {message.name}
                        {selected === message.id && (
                          <span className="ml-2 text-blue-600 text-sm">✓ Sélectionné</span>
                        )}
                      </CardTitle>
                      {!message.isRead && (
                        <Badge variant="destructive" className="text-xs">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {message.email}
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {message.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelect(message.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!message.isRead && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 line-clamp-2">
                  {message.message}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredMessages.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.ceil(filteredMessages.length / 10) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredMessages.length / 10)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Modal de détail du message */}
      <Dialog open={!!selected} onOpenChange={() => onSelect("")}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message de {messages.find(m => m.id === selected)?.name}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            (() => {
              const msg = messages.find(m => m.id === selected);
              if (!msg) return null;
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Nom:</strong> {msg.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {msg.email}
                    </div>
                    {msg.phone && (
                      <div>
                        <strong>Téléphone:</strong> {msg.phone}
                      </div>
                    )}
                    <div>
                      <strong>Date:</strong> {formatDate(msg.createdAt)}
                    </div>
                  </div>
                  <div>
                    <strong>Message:</strong>
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    {!msg.isRead && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleMarkAsRead(msg.id);
                          onSelect("");
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marquer comme lu
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => onSelect("")}
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}