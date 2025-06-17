'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import homePageData from '@/data/homePageData.json'

// Zod schema for form validation
const paymentFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
})

type PaymentFormData = z.infer<typeof paymentFormSchema>

function PaymentForm() {
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

  const [isSubmitting, setIsSubmitting] = useState(false)

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true)
    
    try {

      const url = 'https://app.0xprocessing.com/Payment'

      const formData = new FormData()
      formData.append('Email', data.email)
      formData.append('FirstName', data.firstName)
      formData.append('LastName', data.lastName)
      formData.append('Currency', 'BTC')
      formData.append('AmountUSD', priceValue.toString())
      formData.append('MerchantId', process.env.NEXT_PUBLIC_MERCHANT_ID || '')
      formData.append('Test', "true")
      formData.append("AutoReturn", "true")
      formData.append('SuccessUrl', `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?plan=${planId}&orderId=${Date.now()}`)
      formData.append('CancelUrl', `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?plan=${planId}&orderId=${Date.now()}`)

      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Failed to process payment')
      }
      // const result = await res.json()
      // if (!result.success) {
      //   throw new Error(result.message || 'Payment processing failed')
      // }
      console.log('Payment processing successful')
      
    } catch (error) {
      console.error('Payment processing failed:', error)
    } finally {
      setIsSubmitting(false)
    }
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-soft-gray"
                >
                  Email Address <sup className="text-red-500">*</sup>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className="bg-true-black/50 border-gray-700 text-white"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Name Fields */}
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
                    type="text"
                    placeholder="John"
                    {...register('firstName')}
                    className="bg-true-black/50 border-gray-700 text-white"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
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
                    type="text"
                    placeholder="Doe"
                    {...register('lastName')}
                    className="bg-true-black/50 border-gray-700 text-white"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
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

              <div className="space-y-3 py-4"></div>
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

export default function PaymentFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  )
}
