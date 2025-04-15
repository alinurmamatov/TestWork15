import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';

import { NavBar } from '@/components';

import '@/styles/globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather app using OpenWeatherMap API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <div className="layout">
          <header className="header">
            <NavBar />
          </header>
          <main className="main">
            <div className="container py-4">{children}</div>
          </main>
          <footer className="footer bg-light py-3">
            <div className="container text-center">
              <p>Weather App &copy; {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
