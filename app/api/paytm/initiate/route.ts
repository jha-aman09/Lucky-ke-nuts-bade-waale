import { type NextRequest, NextResponse } from "next/server"
import { preparePaytmParams } from "@/lib/paytm"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, customerId, amount, email, phone } = body

    // Prepare Paytm payment parameters
    const paytmParams = preparePaytmParams({
      orderId,
      customerId,
      amount,
      email,
      phone,
    })

    // In production, you would:
    // 1. Generate checksum using Paytm SDK on server
    // 2. Call Paytm API to initiate transaction
    // 3. Return txnToken for payment processing

    // For now, returning mock success response
    return NextResponse.json({
      success: true,
      orderId,
      txnToken: "mock_token_" + Date.now(),
      paytmParams,
      message: "Payment initiated successfully",
    })
  } catch (error) {
    console.error("[v0] Paytm initiation error:", error)
    return NextResponse.json({ success: false, message: "Failed to initiate payment" }, { status: 500 })
  }
}
