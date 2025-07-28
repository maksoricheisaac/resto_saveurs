export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'non-lu' | 'lu' | 'repondu';
};

export type MessageStatus = 'non-lu' | 'lu' | 'repondu'; 