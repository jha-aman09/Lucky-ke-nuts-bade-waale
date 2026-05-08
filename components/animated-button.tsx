"use client"

import type React from "react"
import { useState } from "react"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary"
}

export function AnimatedButton({ children, onClick, className = "", variant = "primary" }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClass =
    variant === "primary"
      ? "px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
      : "px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300"

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClass} ${className} relative overflow-hidden`}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" style={{ animation: "pulse 0.5s ease-out" }} />
      )}
      {children}
    </button>
  )
}
