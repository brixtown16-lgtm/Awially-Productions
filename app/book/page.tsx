'use client'

import BookingForm from '@/components/BookingForm'

export default function Book() {
  return (
    <div className="bg-dark min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
            Book a Consultation
          </h1>
          <p className="text-xl text-gray-400">
            Let's discuss your project and find the perfect creative solution.
          </p>
        </div>

        <div className="bg-dark-secondary rounded-lg p-8 md:p-12">
          <BookingForm />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-medium mb-2">Email</h3>
            <p className="text-gray-400">info@awiably.com</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Phone</h3>
            <p className="text-gray-400">+254724052540</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Response Time</h3>
            <p className="text-gray-400">24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}
