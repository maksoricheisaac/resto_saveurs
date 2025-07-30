"use client";
import { useState } from 'react';
import { 
  MessageHeader, 
  MessageList, 
  MessageDetail 
} from '@/components/admin/messages';
import { Message } from '@/types/message';

interface MessagesClientProps {
  initialMessages: Message[];
}

export default function MessagesClient({ initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selected, setSelected] = useState<string | null>(null);



  function handleDelete(id: string) {
    setMessages(msgs => msgs.filter(m => m.id !== id));
    if (selected === id) setSelected(null);
  }

  function handleSelect(id: string) {
    setSelected(id);
  }

  function handleClose() {
    setSelected(null);
  }

  function handleUpdateMessage(messageId: string, updates: Partial<Message>) {
    setMessages(msgs => msgs.map(msg => 
      msg.id === messageId ? { ...msg, ...updates } : msg
    ));
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
          onUpdateMessage={handleUpdateMessage}
        />

        <MessageDetail
          message={selectedMessage}
          onClose={handleClose}
          onUpdateMessage={handleUpdateMessage}
        />
      </div>
    </div>
  );
}