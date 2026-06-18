'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const testimonials = [
  {
    quote: 'Awially Productions transformed our brand story into a visual masterpiece. The drone footage was breathtaking.',
    author: 'James Mwangi',
    role: 'CEO, TechVentures Kenya',
  },
  {
    quote: 'Professional, creative, and incredibly talented. They captured our product launch in a way we never imagined possible.',
    author: 'Sarah Kimani',
    role: 'Marketing Director, Safaricom',
  },
  {
    quote: 'The cinematic quality of their work elevated our entire campaign. Our engagement rates doubled after the video launch.',
    author: 'David Ochieng',
    role: 'Founder, GreenEnergy Africa',
  },
  {
    quote: 'From concept to final delivery, the team was exceptional. The drone cinematography gave our real estate listings a whole new perspective.',
    author: 'Grace Wambui',
    role: 'Real Estate Developer, Nairobi',
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="px-6 py-32 md:px-12 bg-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-light mb-20 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative h-64 md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed italic">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-white font-medium">{testimonials[currentIndex].author}</p>
                <p className="text-gray-500 text-sm mt-1">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}