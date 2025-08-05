import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Resto Saveurs - Restaurant Africain Brazzaville | Cuisine Congolaise Authentique",
    template: "%s | Resto Saveurs"
  },
  description: "Découvrez les saveurs authentiques du Congo à Brazzaville. Restaurant africain proposant une cuisine traditionnelle congolaise dans une ambiance chaleureuse. Réservation en ligne et livraison disponible.",
  keywords: [
    "restaurant africain",
    "cuisine congolaise", 
    "Brazzaville",
    "restaurant Congo",
    "poulet moambé",
    "cuisine traditionnelle",
    "restaurant authentique",
    "réservation restaurant"
  ],
  authors: [{ name: "Resto Saveurs" }],
  creator: "Resto Saveurs",
  publisher: "Resto Saveurs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://resto-saveurs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://resto-saveurs.com',
    title: 'Resto Saveurs - Restaurant Africain Brazzaville',
    description: 'Découvrez les saveurs authentiques du Congo à Brazzaville. Cuisine traditionnelle congolaise dans une ambiance chaleureuse.',
    siteName: 'Resto Saveurs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Resto Saveurs - Restaurant Africain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resto Saveurs - Restaurant Africain Brazzaville',
    description: 'Découvrez les saveurs authentiques du Congo à Brazzaville',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
