'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CounterProps {
  end: number
  suffix: string
  label: string
  duration?: number
}

function AnimatedCounter({ end, suffix, label, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-5xl md:text-6xl font-light text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {count}
        <span className="text-gray-500">{suffix}</span>
      </motion.div>
      <motion.p
        className="text-gray-400 text-sm uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  )
}

const stats = [
  { end: 20, suffix: '+', label: 'Projects Completed' },
  { end: 15, suffix: '+', label: 'Happy Clients' },
  { end: 4, suffix: 'K+', label: 'Footage Captured' },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="px-6 py-24 md:px-12 max-w-5xl mx-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-16"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}