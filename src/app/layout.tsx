import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinav-mansi.wedding'),
  title: 'Abhinav & Mansi — A Story in Bloom | Wedding Celebrations',
  description: 'With great joy, Sh. Inder Pal & Smt. Nirmala and Sh. Mahabir Prasad Sharma & Smt. Babita Sharma invite you to celebrate the wedding of Abhinav & Mansi in Bodhgaya and Noida.',
  keywords: ['Abhinav Mansi Wedding', 'Abhinav Pal', 'Mansi Sharma', 'Bodhgaya Wedding', 'The Royal Palace Banquet Noida', 'Buddha Heritage Resort Bodhgaya'],
  authors: [{ name: 'Abhinav & Mansi' }],
  openGraph: {
    title: 'Abhinav & Mansi — A Story in Bloom',
    description: 'Together with their families, Abhinav & Mansi invite you to their wedding celebrations. Discover events, venues, and RSVP.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Abhinav & Mansi Wedding',
    images: [
      {
        url: '/assets/invitation-page-1.webp',
        width: 1200,
        height: 630,
        alt: 'Abhinav weds Mansi Wedding Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhinav & Mansi — A Story in Bloom',
    description: 'Join us in celebrating the wedding of Abhinav & Mansi. View the itinerary, RSVP, and travel details.',
    images: ['/assets/invitation-page-1.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#4A1521',
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
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="paper-grain text-ink-primary font-sans antialiased min-h-screen flex flex-col selection:bg-blush-200 selection:text-burgundy-900">
        {children}
      </body>
    </html>
  );
}
