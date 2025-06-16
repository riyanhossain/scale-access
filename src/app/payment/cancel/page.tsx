"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function PaymentCancel() {
  const searchParams = useSearchParams()
  const [planName, setPlanName] = useState("")

  useEffect(() => {
    const plan = searchParams.get("plan")
    const planNames = {
      starter: "Starter Package",
      performance: "Performance Package",
      phantom: "Phantom Pack",
    }
    setPlanName(planNames[plan as keyof typeof planNames] || "Package")
  }, [searchParams])

  return (
    <div className="min-h-screen bg-true-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <XCircle className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Payment Cancelled</h1>
          <p className="text-soft-gray">
            Your payment for the <span className="text-neon-blue font-semibold">{planName}</span> was cancelled.
          </p>
        </div>

        <div className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Need help?</h2>
          <p className="text-soft-gray text-sm">
            If you experienced any issues during payment or have questions about our packages, feel free to contact our
            support team.
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
    </div>
  )
}
