'use client'

import { useState, useEffect } from 'react'
import PortfolioGrid from '@/components/PortfolioGrid'

const categories = ['ALL', 'VIDEO', 'PHOTO', 'DRONE']

const sampleProjects = [
  {
    id: '1',
    title: 'Tech Brand Campaign',
    category: 'VIDEO',
    media_url: 'https://via.placeholder.com/600x400',
    thumbnail_url: 'https://via.placeholder.com/600x400',
    description: 'Full-scale campaign production',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Luxury Real Estate',
    category: 'DRONE',
    media_url: 'https://via.placeholder.com/600x400',
    thumbnail_url: 'https://via.placeholder.com/600x400',
    description: 'Aerial property showcase',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Fashion Editorial',
    category: 'PHOTO',
    media_url: 'https://via.placeholder.com/600x400',
    thumbnail_url: 'https://via.placeholder.com/600x400',
    description: 'High-end fashion photography',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Product Launch',
    category: 'VIDEO',
    media_url: 'https://via.placeholder.com/600x400',
    thumbnail_url: 'https://via.placeholder.com/600x400',
    description: 'Dynamic product showcase',
    created_at: new Date().toISOString(),
  },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [projects, setProjects] = useState(sampleProjects)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/upload')
        if (response.ok) {
          const data = await response.json()
          const fetchedProjects = data.projects || []

          if (fetchedProjects.length > 0) {
            if (selectedCategory === 'ALL') {
              setProjects(fetchedProjects)
            } else {
              setProjects(fetchedProjects.filter((p: any) => p.category === selectedCategory))
            }
          } else {
            if (selectedCategory === 'ALL') {
              setProjects(sampleProjects)
            } else {
              setProjects(sampleProjects.filter(p => p.category === selectedCategory))
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        if (selectedCategory === 'ALL') {
          setProjects(sampleProjects)
        } else {
          setProjects(sampleProjects.filter(p => p.category === selectedCategory))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [selectedCategory])

  return (
    <div className="bg-dark min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
            Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A curated selection of our most impactful work.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 font-medium text-sm tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-dark-secondary text-gray-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <PortfolioGrid projects={projects} loading={loading} />
      </div>
    </div>
  )
}
