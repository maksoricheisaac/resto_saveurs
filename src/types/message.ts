export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MessageStatus = 'non-lu' | 'lu' | 'repondu'; 