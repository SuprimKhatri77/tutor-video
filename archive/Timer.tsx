"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type TimeBoxProps = {
  value: number
  label: string
}

const TimeBox = ({ value, label }: TimeBoxProps) => (
  <div className="flex flex-col items-center">
    <AnimatePresence mode="popLayout">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="text-3xl font-bold"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
    </AnimatePresence>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
)

type CountdownTimerProps = {
  targetDate: string | Date
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const diff = targetDate.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export const CountdownTimer = ({ targetDate,className,  ...props }: React.ComponentProps<"div"> & CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(new Date(targetDate))
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date(targetDate)))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={cn("flex gap-6", className)} {...props}>
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}
