'use client'

import { useState } from 'react'
import UploadForm from '@/components/UploadForm'

// Simple protection - in production use proper auth
const ADMIN_KEY = 'studio-admin-2024'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [key, setKey] = useState('')
  const [error, setError] = useState('')

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (key === ADMIN_KEY) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid key')
      setKey('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-dark-secondary rounded-lg p-8">
            <h1 className="text-4xl font-light mb-8 text-center">Admin Panel</h1>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Access Key
                </label>
                <input
                  type="password"
                  value={key}
                  onChange={e => setKey(e.target.value)}
                  placeholder="Enter admin key"
                  className="w-full bg-dark px-4 py-2 border border-gray-700 rounded text-white focus:border-white focus:outline-none"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-white text-black py-2 font-medium hover:bg-gray-200 transition-colors"
              >
                Access
              </button>
            </form>
            <p className="text-gray-500 text-xs text-center mt-6">
              Demo key: studio-admin-2024
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-6xl md:text-7xl font-light mb-4 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your portfolio and projects</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-dark-secondary hover:bg-dark-tertiary text-white text-sm rounded transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-dark-secondary rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-light mb-8">Upload New Project</h2>
          <UploadForm />
        </div>
      </div>
    </div>
  )
}
