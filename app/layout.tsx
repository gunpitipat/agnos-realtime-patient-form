import { Anuphan } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';

const anuphan = Anuphan({
  variable: '--font-anuphan',
  subsets: ['thai', 'latin'],
});

export const metadata: Metadata = {
  title: 'Agnos Real-time Patient Form',
  description: 'A responsive real-time patient form and staff view system',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anuphan.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
