"use client"

import type React from "react"

import { useState } from "react"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`transition-all duration-300 ${
        isHovered ? "shadow-lg -translate-y-1 border-primary/50" : "border-border"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}
