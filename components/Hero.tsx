'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-dark flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background video with parallax tilt */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          scale: 1.15,
          x: springX.get() !== undefined ? springX.get() * -30 - 15 : 0,
          y: springY.get() !== undefined ? springY.get() * -30 - 15 : 0,
        } as any}
      >
        <source src="/videos/drone-hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Tilt-aware overlay - gradient shifts with mouse */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{
          background: springX.get() !== undefined
            ? `radial-gradient(circle at ${springX.get() * 100}% ${springY.get() * 100}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)`
            : 'rgba(0,0,0,0.5)',
        } as any}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 md:px-12 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
            Premium Media Production
          </p>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-tight px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Cinematic Content
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Transform your vision into compelling visual stories that captivate audiences.
        </motion.p>

        <motion.div
          className="flex gap-4 md:gap-6 justify-center flex-wrap px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/portfolio"
            className="px-6 md:px-10 py-3 md:py-4 bg-white text-black font-medium hover:bg-gray-200 transition-all hover:scale-105 text-sm md:text-base"
          >
            View Portfolio
          </Link>
          <Link
            href="/book"
            className="px-6 md:px-10 py-3 md:py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-all text-sm md:text-base"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-500 rounded-full mt-2" />
        </div>
      </motion.div>
    </div>
  )
}