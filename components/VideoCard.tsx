'use client'

interface VideoCardProps {
  media: string
  title?: string
}

export default function VideoCard({ media, title }: VideoCardProps) {
  return (
    <video
      className="w-full h-full object-cover"
      muted
      loop
      onMouseEnter={(e) => e.currentTarget.play()}
      onMouseLeave={(e) => e.currentTarget.pause()}
    >
      <source src={media} type="video/mp4" />
    </video>
  )
}