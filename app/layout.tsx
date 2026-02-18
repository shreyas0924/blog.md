import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: "Shreyas' Blogs",
  description: 'Writing about things I find interesting.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main
            style={{
              width: '66.666%',
              maxWidth: '720px',
              margin: '0 auto',
              paddingBottom: '6rem',
            }}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

