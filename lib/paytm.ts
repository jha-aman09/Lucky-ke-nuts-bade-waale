export interface PaytmConfig {
  merchantId: string
  merchantKey: string
  website: string
  industryType: string
  channelId: string
  callbackUrl: string
}

export interface PaytmPaymentRequest {
  orderId: string
  customerId: string
  amount: string
  email: string
  phone: string
}

// Paytm configuration - these should come from environment variables
export const paytmConfig: PaytmConfig = {
  merchantId: process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID || "YOUR_MERCHANT_ID",
  merchantKey: process.env.PAYTM_MERCHANT_KEY || "YOUR_MERCHANT_KEY",
  website: process.env.NEXT_PUBLIC_PAYTM_WEBSITE || "WEBSTAGING",
  industryType: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE || "Retail",
  channelId: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID || "WEB",
  callbackUrl: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/paytm/callback`,
}

// Generate order ID
export function generateOrderId(): string {
  return `SV-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

// Prepare Paytm payment parameters
export function preparePaytmParams(paymentRequest: PaytmPaymentRequest) {
  return {
    MID: paytmConfig.merchantId,
    WEBSITE: paytmConfig.website,
    INDUSTRY_TYPE_ID: paytmConfig.industryType,
    CHANNEL_ID: paytmConfig.channelId,
    ORDER_ID: paymentRequest.orderId,
    CUST_ID: paymentRequest.customerId,
    TXN_AMOUNT: paymentRequest.amount,
    CALLBACK_URL: paytmConfig.callbackUrl,
    EMAIL: paymentRequest.email,
    MOBILE_NO: paymentRequest.phone,
  }
}
