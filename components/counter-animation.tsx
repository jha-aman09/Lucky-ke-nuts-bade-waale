"use client"

import { useEffect, useState } from "react"

interface CounterAnimationProps {
  end: number
  duration?: number
  suffix?: string
}

export function CounterAnimation({ end, duration = 2000, suffix = "" }: CounterAnimationProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCount(Math.floor(end * progress))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
