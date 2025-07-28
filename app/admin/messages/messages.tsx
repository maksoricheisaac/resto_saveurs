"use client";
import { useState } from 'react';
import { 
  MessageHeader, 
  MessageList, 
  MessageDetail 
} from '@/components/admin/messages';
import { Message } from '@/types/message';

const mockMessages: Message[] = [
  { 
    id: 1, 
    name: 'Jean Dupont', 
    email: 'jean.dupont@email.com', 
    message: 'Bonjour, je souhaite réserver une table pour 4 personnes ce samedi soir à 20h. Pouvez-vous me confirmer la disponibilité ?', 
    date: '2024-06-01',
    status: 'non-lu'
  },
  { 
    id: 2, 
    name: 'Marie Martin', 
    email: 'marie.martin@email.com', 
    message: 'Quels sont vos horaires d\'ouverture ? Et avez-vous des options végétariennes dans votre menu ?', 
    date: '2024-06-02',
    status: 'lu'
  },
  { 
    id: 3, 
    name: 'Pierre Durand', 
    email: 'pierre.durand@email.com', 
    message: 'Excellente expérience lors de ma dernière visite ! Je recommande vivement votre restaurant.', 
    date: '2024-06-03',
    status: 'repondu'
  },
];

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selected, setSelected] = useState<number | null>(null);

  function handleDelete(id: number) {
    setMessages(msgs => msgs.filter(m => m.id !== id));
    if (selected === id) setSelected(null);
  }

  function handleSelect(id: number) {
    setSelected(id);
  }

  function handleClose() {
    setSelected(null);
  }

  const selectedMessage = messages.find(m => m.id === selected) || null;

  return (
    <div className="space-y-8">
      <MessageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MessageList
          messages={messages}
          selected={selected}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />

        <MessageDetail
          message={selectedMessage}
          onClose={handleClose}
        />
      </div>
    </div>
  );
} 