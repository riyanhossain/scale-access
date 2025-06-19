'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

function PaymentSuccessContent() {
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
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
        <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
        <p className="text-soft-gray">
          Thank you for purchasing the{' '}
          <span className="text-neon-blue font-semibold">{planName}</span>
        </p>
        {orderId && (
          <p className="text-soft-gray text-sm">
            Order ID:{' '}
            <span className="text-neon-blue font-mono">{orderId}</span>
          </p>
        )}
      </div>

      <div className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">What happens next?</h2>
        <ul className="text-left text-soft-gray space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-neon-blue">•</span>
            <span>You&apos;ll receive a confirmation email within 5 minutes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-blue">•</span>
            <span>
              Your Facebook ad accounts will be delivered within the specified
              timeframe
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-blue">•</span>
            <span>
              Full account credentials and setup instructions included
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <a
          href="mailto:ops@readyadaccounts.com"
          className="w-full bg-neon-blue hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Contact Support
        </a>

        <Link
          href="/"
          className="w-full border border-white/60 hover:border-white text-soft-gray hover:text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-5 h-5" />
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
          <div className="h-3 bg-gray-700 rounded w-4/5" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-12 bg-blue-700 rounded-lg" />
        <div className="h-12 bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-true-black flex items-center justify-center px-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  )
}
