"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Search, Eye, Edit, Filter, Download, Package, Truck, CheckCircle, Clock } from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  phone: string
  amount: number
  status: string
  date: string
  items: { name: string; quantity: number; price: number }[]
  shippingAddress: string
  paymentMethod: string
}

function AdminOrdersContent() {
  const { user, isTestMode } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "ORD001",
      customer: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      amount: 2599,
      status: "Delivered",
      date: "2024-01-15",
      items: [
        { name: "Premium Almonds", quantity: 2, price: 599 },
        { name: "Kashmiri Saffron", quantity: 1, price: 1299 },
      ],
      shippingAddress: "123 MG Road, Mumbai, Maharashtra 400001",
      paymentMethod: "Paytm",
    },
    {
      id: "ORD002",
      customer: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      amount: 1899,
      status: "Shipped",
      date: "2024-01-14",
      items: [
        { name: "Organic Dates", quantity: 2, price: 449 },
        { name: "Roasted Cashews", quantity: 1, price: 699 },
      ],
      shippingAddress: "456 Park Street, Kolkata, West Bengal 700016",
      paymentMethod: "Card",
    },
    {
      id: "ORD003",
      customer: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 98765 43212",
      amount: 3299,
      status: "Processing",
      date: "2024-01-14",
      items: [
        { name: "Walnut Kernels", quantity: 3, price: 549 },
        { name: "Pistachio Nuts", quantity: 2, price: 799 },
      ],
      shippingAddress: "789 Gandhi Road, Ahmedabad, Gujarat 380001",
      paymentMethod: "Paytm",
    },
    {
      id: "ORD004",
      customer: "Sneha Gupta",
      email: "sneha@example.com",
      phone: "+91 98765 43213",
      amount: 1599,
      status: "Pending",
      date: "2024-01-13",
      items: [
        { name: "Golden Raisins", quantity: 2, price: 349 },
        { name: "Dried Apricots", quantity: 2, price: 429 },
      ],
      shippingAddress: "321 Nehru Place, Delhi 110019",
      paymentMethod: "Card",
    },
    {
      id: "ORD005",
      customer: "Vikram Singh",
      email: "vikram@example.com",
      phone: "+91 98765 43214",
      amount: 4599,
      status: "Delivered",
      date: "2024-01-12",
      items: [
        { name: "Pine Nuts", quantity: 2, price: 1099 },
        { name: "Brazil Nuts", quantity: 3, price: 649 },
      ],
      shippingAddress: "654 Civil Lines, Jaipur, Rajasthan 302006",
      paymentMethod: "Paytm",
    },
  ])

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-500/10 border-green-500/20"
      case "Shipped":
        return "text-blue-600 bg-blue-500/10 border-blue-500/20"
      case "Processing":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20"
      case "Pending":
        return "text-gray-600 bg-gray-500/10 border-gray-500/20"
      default:
        return "text-gray-600 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />
      case "Shipped":
        return <Truck className="w-4 h-4" />
      case "Processing":
        return <Package className="w-4 h-4" />
      case "Pending":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 animate-slide-up">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <button className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Order ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Customer</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-foreground">₹{order.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/shipments?order=${order.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Update Shipment"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl animate-slide-up overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Order Details - {selectedOrder.id}</h2>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Customer Information</h3>
                    <div className="space-y-1">
                      <p className="text-foreground">{selectedOrder.customer}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Order Information</h3>
                    <div className="space-y-1">
                      <p className="text-foreground">Order Date: {selectedOrder.date}</p>
                      <p className="text-foreground">Payment: {selectedOrder.paymentMethod}</p>
                      <p className="text-foreground">
                        Status:{" "}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}
                        >
                          {getStatusIcon(selectedOrder.status)}
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Shipping Address</h3>
                  <p className="text-foreground">{selectedOrder.shippingAddress}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary">₹{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border flex gap-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedOrder(null)
                    router.push(`/admin/shipments?order=${selectedOrder.id}`)
                  }}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Update Shipment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminOrders() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <AdminOrdersContent />
    </Suspense>
  )
}
