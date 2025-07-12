"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const mockMessages = [
  { id: 1, name: 'Jean', email: 'jean@email.com', message: 'Bonjour, je souhaite réserver une table.', date: '2024-06-01' },
  { id: 2, name: 'Marie', email: 'marie@email.com', message: 'Quels sont vos horaires ?', date: '2024-06-02' },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(mockMessages);
  const [selected, setSelected] = useState<number | null>(null);

  function handleDelete(id: number) {
    setMessages(msgs => msgs.filter(m => m.id !== id));
    if (selected === id) setSelected(null);
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 font-serif">Messages reçus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><MessageCircle className="text-amber-600" /> Liste des messages</h2>
          <ul className="space-y-4">
            {messages.map(msg => (
              <li key={msg.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                <div>
                  <div className="font-semibold">{msg.name} <span className="text-gray-500 text-xs">({msg.email})</span></div>
                  <div className="text-gray-500 text-sm">{msg.date}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelected(msg.id)}>Voir</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(msg.id)}>Supprimer</Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        {selected && (
          <Card className="p-8">
            <h2 className="text-xl font-bold mb-6">Détail du message</h2>
            {(() => {
              const msg = messages.find(m => m.id === selected);
              if (!msg) return null;
              return (
                <div>
                  <div className="mb-2"><span className="font-semibold">Nom :</span> {msg.name}</div>
                  <div className="mb-2"><span className="font-semibold">Email :</span> {msg.email}</div>
                  <div className="mb-2"><span className="font-semibold">Date :</span> {msg.date}</div>
                  <div className="mb-4"><span className="font-semibold">Message :</span><br />{msg.message}</div>
                  <Button variant="outline" onClick={() => setSelected(null)}>Fermer</Button>
                </div>
              );
            })()}
          </Card>
        )}
      </div>
    </div>
  );
} 