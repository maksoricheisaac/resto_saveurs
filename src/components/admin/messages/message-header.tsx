"use client";

interface MessageHeaderProps {
  children?: React.ReactNode;
}

export function MessageHeader({ children }: MessageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-900 font-serif">Messages reçus</h1>
      <p className="text-gray-600">Gérez les messages de vos clients</p>
      {children}
    </div>
  );
} 