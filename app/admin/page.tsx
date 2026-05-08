"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight, Eye, Edit, Truck } from "lucide-react"

export default function AdminDashboard() {
  const { user, isTestMode } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // Check if user is admin
    if (isTestMode) {
      if (user.email !== "admin@example.com") {
        router.push("/")
        return
      }
    }

    setLoading(false)
  }, [user, isTestMode, router])

  if (loading || !user) {
    return null
  }

  if (isTestMode && user.email !== "admin@example.com") {
    return null
  }

  // Mock data for dashboard - in production, fetch from API/database
  const stats = [
    {
      title: "Total Sales",
      value: "₹1,24,567",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
      borderColor: "border-green-500/20",
    },
    {
      title: "Total Orders",
      value: "456",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Products",
      value: "20",
      change: "+2",
      isPositive: true,
      icon: Package,
      bgColor: "bg-amber-500/10",
      iconColor: "text-amber-600",
      borderColor: "border-amber-500/20",
    },
    {
      title: "Customers",
      value: "289",
      change: "+15.3%",
      isPositive: true,
      icon: Users,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
      borderColor: "border-purple-500/20",
    },
  ]

  const recentOrders = [
    { id: "ORD001", customer: "Rajesh Kumar", amount: 2599, status: "Delivered", date: "2024-01-15" },
    { id: "ORD002", customer: "Priya Sharma", amount: 1899, status: "Shipped", date: "2024-01-14" },
    { id: "ORD003", customer: "Amit Patel", amount: 3299, status: "Processing", date: "2024-01-14" },
    { id: "ORD004", customer: "Sneha Gupta", amount: 1599, status: "Pending", date: "2024-01-13" },
    { id: "ORD005", customer: "Vikram Singh", amount: 4599, status: "Delivered", date: "2024-01-12" },
  ]

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.displayName || user.email}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 animate-slide-up hover:scale-105 transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                </div>
                <div className={`${stat.bgColor} ${stat.iconColor} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/products"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group animate-slide-up"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Manage Products</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">View Orders</h3>
                <p className="text-sm text-muted-foreground">Track and manage orders</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/shipments"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Manage Shipments</h3>
                <p className="text-sm text-muted-foreground">Update shipping status</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div
          className="bg-card border border-border rounded-xl p-6 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{order.customer}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-foreground">₹{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:text-primary/80 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-primary hover:text-primary/80 transition-colors">
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
      </div>
    </div>
  )
}
