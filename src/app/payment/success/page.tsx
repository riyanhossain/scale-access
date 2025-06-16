"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccess() {
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
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
          <p className="text-soft-gray">
            Thank you for purchasing the <span className="text-neon-blue font-semibold">{planName}</span>
          </p>
        </div>

        <div className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">What happens next?</h2>
          <ul className="text-left text-soft-gray space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              <span>You'll receive a confirmation email within 5 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              <span>Your Facebook ad accounts will be delivered within the specified timeframe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-blue">•</span>
              <span>Full account credentials and setup instructions included</span>
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
    </div>
  )
}
