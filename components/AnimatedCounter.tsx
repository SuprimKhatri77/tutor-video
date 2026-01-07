"use client"

import {
  animate,
  easeOut,
  KeyframeOptions,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion"
import { useRef } from "react"

type AnimatedCounterProps = {
  from: number
  to: number
  animationOptions?: KeyframeOptions
}

export const AnimatedCounter = ({
  from,
  to,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  // Detect when element is visible
  const isInView = useInView(ref, {
    once: true, //  animate only once
    margin: "-50px", // optional: trigger slightly earlier
  })

  useIsomorphicLayoutEffect(() => {
    if (!isInView) return

    const element = ref.current
    if (!element) return

    element.textContent = from.toFixed(0)

    const controls = animate(from, to, {
      duration: 1.5,
      ease: easeOut,
      ...animationOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(0)
      },
    })

    return () => controls.stop()
  }, [isInView, from, to, animationOptions])

  return <span ref={ref} />
}
