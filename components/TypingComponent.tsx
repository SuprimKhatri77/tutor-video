"use client"
import { motion } from "framer-motion"

type TypingProps = {
  text: string
  className?: string
}

export const LocalTypewriter = ({ text, className }: TypingProps) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.span
      className={className + " inline-block"} // merge passed styles
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
