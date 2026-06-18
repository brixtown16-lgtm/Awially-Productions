'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const uploadSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  media_url: z.string().url('Invalid URL'),
  thumbnail_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string().optional(),
})

type UploadFormData = z.infer<typeof uploadSchema>

const categories = ['VIDEO', 'PHOTO', 'DRONE', 'ANIMATION']

function generateThumbnailFromVideo(videoUrl: string): string {
  if (!videoUrl.includes('cloudinary.com')) return videoUrl

  try {
    const url = new URL(videoUrl)

    if (url.pathname.includes('/video/upload/')) {
      url.pathname = url.pathname.replace('/video/upload/', '/image/upload/f_auto,q_80,w_400,h_300,c_fill/')
    } else if (url.pathname.includes('/image/upload/')) {
      if (!url.pathname.includes(',')) {
        url.pathname = url.pathname.replace('/image/upload/', '/image/upload/f_auto,q_80,w_400,h_300,c_fill/')
      }
    }

    return url.toString()
  } catch {
    return videoUrl
  }
}

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit = async (data: UploadFormData) => {
    setIsSubmitting(true)
    setError('')
    setSubmitMessage('')

    try {
      const thumbnailUrl = data.thumbnail_url || generateThumbnailFromVideo(data.media_url)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          thumbnail_url: thumbnailUrl,
        }),
      })

      if (response.ok) {
        setSubmitMessage('✓ Project uploaded successfully!')
        reset()
      } else {
        const result = await response.json()
        setError(result.error || 'Failed to upload project')
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

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Title *</label>
        <input
          type="text"
          {...register('title')}
          className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
          placeholder="e.g., Nike Campaign 2024"
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            {...register('category')}
            className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white transition-colors"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
        </div>

        {/* Placeholder - Cloudinary integration note */}
        <div>
          <label className="block text-sm font-medium mb-2">Media Source</label>
          <div className="text-gray-500 text-sm px-4 py-3 border border-gray-700 rounded">
            Cloudinary integration ready
          </div>
        </div>
      </div>

      {/* Media URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Media URL *</label>
        <input
          type="url"
          {...register('media_url')}
          className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
          placeholder="https://example.com/video.mp4"
        />
        {errors.media_url && <p className="text-red-400 text-xs mt-1">{errors.media_url.message}</p>}
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail URL (optional)</label>
        <input
          type="url"
          {...register('thumbnail_url')}
          className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors"
          placeholder="https://example.com/thumbnail.jpg"
        />
        {errors.thumbnail_url && <p className="text-red-400 text-xs mt-1">{errors.thumbnail_url.message}</p>}
        <p className="text-gray-500 text-xs mt-1">Leave blank to use media URL</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full bg-dark px-4 py-3 border border-gray-700 rounded focus:border-white focus:outline-none text-white placeholder-gray-600 transition-colors resize-none"
          placeholder="Project description and details..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black py-4 font-medium hover:bg-gray-200 disabled:opacity-50 transition-all"
      >
        {isSubmitting ? 'Uploading...' : 'Upload Project'}
      </button>
    </form>
  )
}
