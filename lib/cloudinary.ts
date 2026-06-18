// Cloudinary integration utilities
// Configure credentials in environment variables

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Cloudinary credentials not fully configured')
}

export const cloudinaryConfig = {
  cloudName,
  apiKey,
  apiSecret,
}

// Generate upload widget configuration
export function getCloudinaryUploadConfig() {
  if (!cloudName) {
    throw new Error('Cloudinary cloud name not configured')
  }

  return {
    cloudName,
    uploadPreset: 'studio_uploads', // Configure in Cloudinary dashboard
    folder: 'studio-projects',
    resourceType: 'auto', // Supports video, image, raw
    maxFileSize: 1000000000, // 1GB
    secure: true,
  }
}

// Generate signed URL for upload
export function generateSignedUploadUrl(params: Record<string, any>) {
  // Implementation would generate a signed URL for direct upload
  // This is a placeholder - actual implementation requires additional libraries
  return `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
}

// Helper to build Cloudinary asset URL
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number
    height?: number
    crop?: string
    quality?: string
  }
) {
  if (!cloudName) return publicId

  const params = new URLSearchParams()

  if (options?.width) params.append('w', String(options.width))
  if (options?.height) params.append('h', String(options.height))
  if (options?.crop) params.append('c', options.crop)
  if (options?.quality) params.append('q', options.quality)

  const queryString = params.toString()
  return `https://res.cloudinary.com/${cloudName}/image/upload/${
    queryString ? '?' + queryString : ''
  }${publicId}`
}
