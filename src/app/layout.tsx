import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/logo-small.png',
    shortcut: '/logo-small.png',
    apple: '/logo-small.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/logo-small.png',
    },
  },
  title: 'Scale Access',
  description: 'Own your Facebook ad account. Warm, aged, and built to last.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
