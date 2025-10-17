import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'adMCP',
  description: 'ads in your ai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
