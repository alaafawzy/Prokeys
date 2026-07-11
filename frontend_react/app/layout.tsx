import type { ReactNode } from 'react';

export const metadata = {
  title: 'Prokeys - Professional Services',
  description: 'Prokeys provides professional services and solutions',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#5DD5E0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
