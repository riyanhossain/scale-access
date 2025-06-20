'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

function PaymentCancelContent() {
  const searchParams = useSearchParams()
  const [planName, setPlanName] = useState('')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const plan = searchParams.get('plan')
    const orderIdParam = searchParams.get('orderId')

    const planNames = {
      starter: 'Starter Package',
      performance: 'Performance Package',
      phantom: 'Phantom Pack',
    }
    setPlanName(planNames[plan as keyof typeof planNames] || 'Package')
    setOrderId(orderIdParam || '')
  }, [searchParams])

  return (
    <div className="max-w-md w-full text-center space-y-8">
      <div className="space-y-4">
        <XCircle className="w-16 h-16 text-red-400 mx-auto" />
        <h1 className="text-3xl font-bold text-white">Payment Cancelled</h1>
        <p className="text-soft-gray">
          Your payment for the{' '}
          <span className="text-neon-blue font-semibold">{planName}</span> was
          cancelled.
        </p>
        {orderId && (
          <p className="text-soft-gray text-sm">
            Order ID:{' '}
            <span className="text-neon-blue font-mono">{orderId}</span>
          </p>
        )}
      </div>

      <div className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Need help?</h2>
        <p className="text-soft-gray text-sm">
          If you experienced any issues during payment or have questions about
          our packages, feel free to contact our support team.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/#pricing"
          className="w-full bg-neon-blue hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </Link>

        <Link
          href="/"
          className="w-full border border-white/60 hover:border-white text-soft-gray hover:text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="max-w-md w-full text-center space-y-8">
      <div className="animate-pulse space-y-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto" />
        <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto" />
      </div>
      <div className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="h-5 bg-gray-700 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-700 rounded w-5/6" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-12 bg-blue-700 rounded-lg" />
        <div className="h-12 bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-true-black flex items-center justify-center px-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentCancelContent />
      </Suspense>
    </div>
  )
}
