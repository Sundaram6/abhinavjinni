import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mansiwedsabhinav.vercel.app'),
  title: 'Mansi weds Abhinav — A Story in Bloom | Wedding Celebrations',
  description: 'With great joy, Sh. Inder Pal & Smt. Nirmala and Sh. Mahabir Prasad Sharma & Smt. Babita Sharma invite you to celebrate the wedding of Abhinav & Mansi in Bodhgaya and Noida.',
  keywords: ['Abhinav Mansi Wedding', 'Abhinav Pal', 'Mansi Sharma', 'Bodhgaya Wedding', 'The Royal Palace Banquet Noida', 'Buddha Heritage Resort Bodhgaya'],
  authors: [{ name: 'Abhinav & Mansi' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://mansiwedsabhinav.vercel.app',
  },
  openGraph: {
    title: 'Abhinav & Mansi — A Story in Bloom',
    description: 'Together with their families, Abhinav & Mansi invite you to their wedding celebrations. Discover events, venues, and wedding details.',
    type: 'website',
    url: 'https://mansiwedsabhinav.vercel.app',
    locale: 'en_IN',
    siteName: 'Abhinav & Mansi Wedding Celebrations',
    images: [
      {
        url: 'https://mansiwedsabhinav.vercel.app/og-image.jpg',
        secureUrl: 'https://mansiwedsabhinav.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Abhinav & Mansi Wedding Celebrations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhinav & Mansi — A Story in Bloom',
    description: 'Together with their families, Abhinav & Mansi invite you to their wedding celebrations in Bodhgaya.',
    images: ['https://mansiwedsabhinav.vercel.app/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#4A0E4E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Mukta:wght@400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="paper-grain text-ink-primary font-sans antialiased min-h-screen flex flex-col selection:bg-ruby-100 selection:text-burgundy-950">
        {children}
      </body>
    </html>
  );
}