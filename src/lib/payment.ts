interface PaymentData {
  planId: string
  planName: string
  amount: number
  currency: string
  customerEmail?: string
  successUrl: string
  cancelUrl: string
}

export class PaymentService {
  private static readonly API_URL = 'https://app.0xprocessing.com/Payment'
  private static readonly MERCHANT_ID =
    process.env.NEXT_PUBLIC_OXPROCESSING_MERCHANT_ID || 'your-merchant-id'

  static async createPayment(data: PaymentData): Promise<string> {
    const orderId = this.generateOrderId()

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(this.preparePaymentData(data, orderId)),
      })

      if (!response.ok)
        throw new Error(`Payment creation failed: ${response.statusText}`)

      const result = await response.json()
      return result.payment_url || result.redirect_url
    } catch (error) {
      console.error('Payment creation error:', error)
      throw new Error('Failed to create payment. Please try again.')
    }
  }

  static generatePaymentUrl(data: PaymentData): string {
    const params = new URLSearchParams({
      ...this.preparePaymentData(data, this.generateOrderId()),
    })
    return `${this.API_URL}?${params.toString()}`
  }

  private static generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private static preparePaymentData(
    data: PaymentData,
    orderId: string
  ): Record<string, string> {
    return {
      merchant_id: this.MERCHANT_ID,
      amount: data.amount.toString(),
      currency: data.currency,
      order_id: orderId,
      description: `Ready Ad Accounts - ${data.planName}`,
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      ...(data.customerEmail && { customer_email: data.customerEmail }),
    }
  }
}

export const handlePayment = async (
  planId: string,
  planName: string,
  amount: number
) => {
  try {
    const paymentUrl = PaymentService.generatePaymentUrl({
      planId,
      planName,
      amount,
      currency: 'USD',
      successUrl: `${window.location.origin}/payment/success?plan=${planId}`,
      cancelUrl: `${window.location.origin}/payment/cancel?plan=${planId}`,
    })
    window.open(
      paymentUrl,
      '_blank',
      'width=800,height=600,scrollbars=yes,resizable=yes'
    )
  } catch (error) {
    console.error('Payment error:', error)
    alert('Payment processing failed. Please try again or contact support.')
  }
}
