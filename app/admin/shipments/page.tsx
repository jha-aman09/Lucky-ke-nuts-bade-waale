"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Package, Truck, MapPin, Calendar, CheckCircle } from "lucide-react"

function ShipmentManagementContent() {
  const { user, isTestMode } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("Pending")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const [carrier, setCarrier] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (user) {
      if (isTestMode && user.email !== "admin@example.com") {
        router.push("/")
      }
      setLoading(false)
    } else {
      router.push("/")
    }
  }, [user, isTestMode, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would call an API to update shipment status
    console.log("[v0] Updating shipment:", {
      orderId,
      status: selectedStatus,
      trackingNumber,
      estimatedDelivery,
      carrier,
      notes,
    })
    alert("Shipment updated successfully!")
    router.push("/admin/orders")
  }

  const shipmentStatuses = [
    { value: "Pending", icon: Package, color: "gray" },
    { value: "Processing", icon: Package, color: "amber" },
    { value: "Shipped", icon: Truck, color: "blue" },
    { value: "Out for Delivery", icon: MapPin, color: "purple" },
    { value: "Delivered", icon: CheckCircle, color: "green" },
  ]

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shipment Management</h1>
          <p className="text-muted-foreground">Update shipping status and tracking information</p>
          {orderId && <p className="text-sm text-primary mt-2">Managing Order: {orderId}</p>}
        </div>

        <div className="bg-card border border-border rounded-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">Shipment Status</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {shipmentStatuses.map((status) => {
                  const Icon = status.icon
                  const isSelected = selectedStatus === status.value
                  return (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => setSelectedStatus(status.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? `border-${status.color}-500 bg-${status.color}-500/10`
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${isSelected ? `text-${status.color}-600` : "text-muted-foreground"}`}
                      />
                      <p className={`text-xs font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {status.value}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Enter tracking number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Carrier/Courier</label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Select carrier</option>
                  <option value="BlueDart">BlueDart</option>
                  <option value="DTDC">DTDC</option>
                  <option value="India Post">India Post</option>
                  <option value="Delhivery">Delhivery</option>
                  <option value="FedEx">FedEx</option>
                  <option value="DHL">DHL</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Estimated Delivery Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="date"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                placeholder="Add any additional notes about the shipment..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/orders")}
                className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Update Shipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ShipmentManagement() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <ShipmentManagementContent />
    </Suspense>
  )
}
