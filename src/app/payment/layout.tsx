import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Your Payment - Scale Access',
  description: 'Complete your purchase of Facebook Ad Accounts.',
}

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-gray via-true-black to-dark-gray">
      {children}
    </div>
  )
}
