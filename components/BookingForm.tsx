'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  date: z.string().optional(),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const services = [
  'Video Production',
  'Photography',
  'Drone Videography',
  'Animation',
  'Full Campaign',
  'Consulting',
]

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError('')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage('✓ Booking submitted! We\'ll be in touch within 24 hours.')
        reset()
      } else {
        const result = await response.json()
        setError(result.error || 'Failed to submit booking')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitMessage && (
        <div className="p-4 bg-green-900/20 border border-green-500 rounded text-green-300 text-sm">
          {submitMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            {...register('name')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            {...register('email')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone *</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium mb-2">Service *</label>
          <select
            {...register('service')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white transition-colors"
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-2">Budget</label>
          <select
            {...register('budget')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="5k-10k">$5K - $10K</option>
            <option value="10k-25k">$10K - $25K</option>
            <option value="25k-50k">$25K - $50K</option>
            <option value="50k+">$50K+</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Desired Start Date</label>
          <input
            type="date"
            {...register('date')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white transition-colors"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Details</label>
        <textarea
          {...register('notes')}
          rows={4}
          className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black py-4 font-medium hover:bg-gray-200 disabled:opacity-50 transition-all"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
      </button>

      <p className="text-gray-500 text-xs text-center">
        We'll review your request and get back to you within 24 hours.
      </p>
    </form>
  )
}
