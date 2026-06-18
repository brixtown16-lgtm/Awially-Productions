'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  category: string
  media_url: string
  thumbnail_url: string
  description: string
  created_at: string
}

interface PortfolioGridProps {
  projects: Project[]
  loading?: boolean
}

export default function PortfolioGrid({ projects, loading = false }: PortfolioGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-96 bg-dark-secondary rounded-lg mb-6" />
            <div className="h-6 bg-dark-secondary rounded w-3/4 mb-3" />
            <div className="h-4 bg-dark-secondary rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg h-96 md:h-96 mb-8 bg-dark-secondary">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-all"
                >
                  View Project
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-light group-hover:text-gray-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                {project.category}
              </p>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="relative">
              {selectedProject.media_url.includes('/video/') ? (
                <video
                  src={selectedProject.media_url}
                  controls
                  className="w-full"
                  autoPlay
                />
              ) : (
                <Image
                  src={selectedProject.media_url}
                  alt={selectedProject.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-light mb-2">{selectedProject.title}</h2>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">{selectedProject.category}</p>
              <p className="text-gray-300">{selectedProject.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
