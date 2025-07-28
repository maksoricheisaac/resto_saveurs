import { Metadata } from 'next';
import ReservationClient from './reservation';

export const metadata: Metadata = {
  title: 'Réserver une table - Resto Saveurs',
  description: 'Réservez votre table au restaurant Resto Saveurs à Brazzaville. Cuisine congolaise authentique dans une ambiance chaleureuse. Réservation en ligne simple et rapide.',
  openGraph: {
    title: 'Réserver une table - Resto Saveurs',
    description: 'Réservez votre table au restaurant Resto Saveurs à Brazzaville. Cuisine congolaise authentique.',
  },
};

export default function Reservation() {
  return <ReservationClient />;
} 