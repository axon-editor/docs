import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://axoneditor.com'),
  title: {
    default: 'Axon Documentation',
    template: '%s | Axon Documentation',
  },
  description: 'Documentation for Axon, the desktop code editor for workspace-aware development.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-black text-zinc-100">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
