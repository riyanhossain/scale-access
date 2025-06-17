'use client'

import { Check, ArrowRight } from 'lucide-react'
import homePageData from '@/data/homePageData.json'
import { useRouter } from 'next/navigation'

const Pricing = () => {
  const { pricing } = homePageData
  const router = useRouter()

  const handlePurchase = (
    planId: string,
    planName: string,
    priceValue: number
  ) => {
    router.push(`/payment/form?plan=${planId}&name=${encodeURIComponent(
      planName
    )}&price=${priceValue}`)

  }

  return (
    <section id="pricing" className={pricing.sectionClassName}>
      <div className={pricing.containerClassName}>
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {pricing.title}
          </h2>
          <p className="text-xl text-soft-gray max-w-2xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>

        <div className={pricing.gridClassName}>
          {pricing.plans.map((plan, index) => (
            <div key={index} className={plan.cardClassName}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={pricing.popularBadge.className}>
                    {pricing.popularBadge.text}
                  </span>
                </div>
              )}

              <div className="text-center mb-8 space-y-4">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="text-4xl font-bold text-white">
                  {plan.price}
                </div>
                <div className="w-12 h-0.5 bg-neon-blue mx-auto"></div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-soft-gray"
                  >
                    <Check className={pricing.featureIcon.className} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    handlePurchase(plan.id, plan.name, plan.priceValue)
                  }
                  className={`cursor-pointer ${
                    pricing.buttons.primary.baseClassName
                  } ${
                    plan.popular
                      ? pricing.buttons.primary.popularClassName
                      : pricing.buttons.primary.regularClassName
                  }`}
                >
                  {pricing.buttons.primary.text}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={pricing.buttons.secondary.href}
                  className={pricing.buttons.secondary.className}
                >
                  {pricing.buttons.secondary.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
