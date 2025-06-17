'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  currency: z
    .string()
    .min(1, 'Please select a currency'),
})

type PaymentFormData = z.infer<typeof paymentFormSchema>

function PaymentForm() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || ''

  const { pricing } = homePageData
  const selectedPlan = pricing.plans.find((plan) => plan.id === planId);

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      currency: 'USDT', // Default to USDT
    },
  })

  const selectedCurrency = watch('currency')

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true)
    
    try {
      const orderId = Date.now().toString()
      const url = 'https://app.0xprocessing.com/Payment'

      if (!selectedPlan) {
        throw new Error('Selected plan not found')
      }

      // Create URL-encoded data according to 0xProcessing API specification
      const params = new URLSearchParams()
      params.append('test', 'true') // Set to false for production
      params.append('email', data.email)
      params.append('name', data.firstName)
      params.append('lastname', data.lastName)
      params.append('AmountUSD', selectedPlan.priceValue.toString())
      params.append('currency', data.currency)
      params.append('MerchantId', "0xMR2409448")
      params.append('ClientId', orderId)
      params.append('BillingId', orderId)
      params.append('ReturnUrl', 'true')
      params.append('SuccessUrl', `${window.location.origin}/payment/success?plan=${planId}&orderId=${orderId}`)
      params.append('CancelUrl', `${window.location.origin}/payment/cancel?plan=${planId}&orderId=${orderId}`)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.log('Error response body:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      // Check if response is JSON (when ReturnUrl=true) or redirect
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response with redirectUrl
        const result = await response.json()
        console.log('Payment response:', result)
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl
        } else {
          throw new Error('No redirect URL received from payment processor')
        }
      } else {
        // Handle direct redirect (fallback)
        const responseText = await response.text()
        console.log('Non-JSON response:', responseText)
        window.location.href = response.url
      }
      
    } catch (error) {
      console.error('Payment processing failed:', error)
      alert(`Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
            Enter your details to purchase the {selectedPlan?.name} plan
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

              {/* Currency Selection */}
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-soft-gray">
                  Payment Currency <sup className="text-red-500">*</sup>
                </label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={currencyOpen}
                          className="w-full justify-between bg-true-black/50 border-gray-700 text-white hover:bg-true-black/70"
                        >
                          {field.value
                            ? homePageData.currency.find((curr) => curr === field.value)
                            : "Select currency..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-full p-0 bg-dark-gray border-gray-700">
                        <Command className="bg-dark-gray">
                          <CommandInput 
                            placeholder="Search currency..." 
                            className="h-9 bg-dark-gray text-white border-gray-700" 
                          />
                          <CommandList>
                            <CommandEmpty className="text-soft-gray">No currency found.</CommandEmpty>
                            <CommandGroup>
                              {homePageData.currency.map((curr) => (
                                <CommandItem
                                  key={curr}
                                  value={curr}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue.toUpperCase())
                                    setCurrencyOpen(false)
                                  }}
                                  className="text-white !bg-dark-gray hover:!bg-gray-700"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === curr ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {curr}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.currency && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-neon-blue/25 cursor-pointer"
              >
                {isSubmitting ? 'Processing...' : `Pay ${selectedPlan?.price}`}
              </Button>
            </form>
          </Card>

          {/* Order Summary */}
          <Card className="bg-dark-gray/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <h3 className="font-semibold text-lg">
                  {selectedPlan?.name} Plan
                </h3>
                <span className="text-neon-blue font-bold text-xl">
                  {selectedPlan?.price}
                </span>
              </div>

              <div className="space-y-3 py-4"></div>
              <div className="space-y-3 py-4">
                <h4 className="text-sm font-medium text-soft-gray">
                  Plan includes:
                </h4>
                <ul className="space-y-3">
                  {selectedPlan?.features.map((feature, index) => (
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
                    {selectedPlan?.price}
                  </span>
                </div>
                <p className="text-xs text-soft-gray mt-2">
                  Payment will be processed securely via 0xProcessing with {selectedCurrency || 'USDT'}
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
