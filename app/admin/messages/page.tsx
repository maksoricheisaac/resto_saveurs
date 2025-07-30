import MessagesClient from './messages';
import { MessageStats } from '@/components/admin/messages/message-stats';
import { getMessages } from '@/actions/admin/message-actions';

export default async function MessagesPage() {
  const messagesResult = await getMessages({ page: 1, limit: 10, filter: 'all', dateFilter: '' });
  const messages = messagesResult.data?.success && messagesResult.data.data ? 
    messagesResult.data.data.messages.map(msg => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      message: msg.message,
      isRead: msg.isRead,
      createdAt: msg.createdAt.toISOString(),
      updatedAt: msg.updatedAt.toISOString()
    })) : [];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Messages Clients
        </h1>
        <p className="text-gray-600">
          Gérez les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Statistiques */}
      <MessageStats />

      {/* Liste des messages */}
      <MessagesClient initialMessages={messages} />
    </div>
  );
} 