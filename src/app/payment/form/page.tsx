'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import homePageData from '@/data/homePageData.json'

export default function PaymentFormPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || ''
  const planName = searchParams.get('name') || ''
  const priceValue = Number(searchParams.get('price') || '0')

  const { pricing } = homePageData
  const selectedPlan = pricing.plans.find((plan) => plan.id === planId) || {
    name: planName,
    price: `$${priceValue}`,
    features: [],
  }

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError('')

    if (!formData.email || !formData.firstName || !formData.lastName) {
      setFormError('All fields are required')
      setIsSubmitting(false)
      return
    }

    const form = document.createElement('form')
    form.method = 'post'
    form.action = 'https://app.0xprocessing.com/Payment'

    const formInputs = {
      test: true,
      email: formData.email,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Amount: priceValue.toString(),
      Currency: 'BTC',
      MerchantId: process.env.NEXT_PUBLIC_OXPROCESSING_MERCHANT_ID || '',
      ClientId: Date.now().toString(),
      BillingId: Math.floor(Math.random() * 100000).toString(),
      SuccessUrl: `${
        window.location.origin
      }/payment/success?plan=${planId}&orderId=${Date.now()}`,
      CancelUrl: `${
        window.location.origin
      }/payment/cancel?plan=${planId}&orderId=${Date.now()}`,
      AutoReturn: true,
    }

    Object.entries(formInputs).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value.toString()
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <div className="min-h-screen bg-true-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your Order
          </h1>
          <p className="text-soft-gray text-lg">
            Enter your details to purchase the {selectedPlan.name} plan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Contact Information</h2>

            {formError && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg mb-6">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-soft-gray"
                >
                  Email Address <sup className="text-red-500">*</sup>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-true-black/50 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-soft-gray"
                  >
                    First Name <sup className="text-red-500">*</sup>
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-true-black/50 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-soft-gray"
                  >
                    Last Name <sup className="text-red-500">*</sup>
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-true-black/50 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-neon-blue/25 cursor-pointer"
              >
                {isSubmitting ? 'Processing...' : `Pay ${selectedPlan.price}`}
              </Button>
            </form>
          </Card>

          {/* Order Summary */}
          <Card className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <h3 className="font-semibold text-lg">
                  {selectedPlan.name} Plan
                </h3>
                <span className="text-neon-blue font-bold text-xl">
                  {selectedPlan.price}
                </span>
              </div>

              <div className="space-y-3 py-4">
                <h4 className="text-sm font-medium text-soft-gray">
                  Plan includes:
                </h4>
                <ul className="space-y-3">
                  {selectedPlan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-soft-gray"
                    >
                      <Check className="w-5 h-5 text-neon-blue flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-white">
                    {selectedPlan.price}
                  </span>
                </div>
                <p className="text-xs text-soft-gray mt-2">
                  Payment will be processed securely via 0xProcessing with USDT
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
