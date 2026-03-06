import { Anuphan } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const anuphan = Anuphan({
  variable: '--font-anuphan',
  subsets: ['thai', 'latin'],
});

export const metadata: Metadata = {
  title: 'Agnos Real-time Patient Form',
  description: 'A responsive real-time patient form and staff view system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anuphan.variable}>{children}</body>
    </html>
  );
}
