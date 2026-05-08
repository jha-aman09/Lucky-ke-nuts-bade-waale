"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface StaggerContainerProps {
  children: React.ReactNode[]
  delay?: number
  className?: string
}

export function StaggerContainer({ children, delay = 0.1, className = "" }: StaggerContainerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-5"}`}
          style={{
            transitionDelay: `${index * delay}s`,
            animation: isVisible ? `fadeInUp 0.6s ease-out ${index * delay}s both` : "none",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
