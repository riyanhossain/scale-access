"use client"

import { Check, Bitcoin } from "lucide-react"
import homePageData from "@/data/homePageData.json"
import { handlePayment } from "@/lib/payment"

const Pricing = () => {
  const { pricing } = homePageData

  const handlePurchase = async (planId: string, planName: string, priceValue: number) => {
    try {
      await handlePayment(planId, planName, priceValue)
    } catch (error) {
      console.error("Purchase error:", error)
    }
  }

  return (
    <section id="pricing" className={pricing.sectionClassName}>
      <div className={pricing.containerClassName}>
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{pricing.title}</h2>
          <p className="text-xl text-soft-gray max-w-2xl mx-auto">{pricing.subtitle}</p>

          <div className="flex items-center justify-center gap-4 text-sm text-soft-gray">
            <span>Secure crypto payments via</span>
            <div className="flex items-center gap-2">
              <Bitcoin className="w-4 h-4 text-neon-blue" />
              <span className="text-neon-blue font-semibold">0xProcessing</span>
            </div>
          </div>
        </div>

        <div className={pricing.gridClassName}>
          {pricing.plans.map((plan, index) => (
            <div key={index} className={plan.cardClassName}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={pricing.popularBadge.className}>{pricing.popularBadge.text}</span>
                </div>
              )}

              <div className="text-center mb-8 space-y-4">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="text-4xl font-bold text-white">{plan.price}</div>
                <div className="w-12 h-0.5 bg-neon-blue mx-auto"></div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-soft-gray">
                    <Check className={pricing.featureIcon.className} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => handlePurchase(plan.id, plan.name, plan.priceValue)}
                  className={`${pricing.buttons.primary.baseClassName} ${
                    plan.popular ? pricing.buttons.primary.popularClassName : pricing.buttons.primary.regularClassName
                  }`}
                >
                  <Bitcoin className="w-5 h-5" />
                  {pricing.buttons.primary.text}
                </button>

                <a href={pricing.buttons.secondary.href} className={pricing.buttons.secondary.className}>
                  {pricing.buttons.secondary.text}
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-2 text-xs text-soft-gray">
                  <span>Accepts:</span>
                  {pricing.paymentConfig.acceptedCryptos.map((crypto, cryptoIndex) => (
                    <span key={cryptoIndex} className="text-neon-blue font-medium">
                      {crypto}
                      {cryptoIndex < pricing.paymentConfig.acceptedCryptos.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-dark-gray/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bitcoin className="w-6 h-6 text-neon-blue" />
              <h3 className="text-lg font-semibold text-white">Secure Crypto Payments</h3>
            </div>
            <p className="text-soft-gray text-sm leading-relaxed">
              All payments are processed securely through 0xProcessing. Your transaction is protected by blockchain
              technology and enterprise-grade security. No personal information stored.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
