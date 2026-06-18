import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

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

export async function POST(request: NextRequest) {
  try {
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('*')

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: fetchError },
        { status: 500 }
      )
    }

    let updated = 0

    for (const project of projects) {
      const isVideo = project.media_url?.includes('/video/upload/')
      let needsUpdate = false
      let newThumbnail = project.thumbnail_url

      // Fix old video thumbnail URLs
      if (isVideo && project.thumbnail_url?.includes('/video/upload/f_auto')) {
        newThumbnail = project.thumbnail_url.replace('/video/upload/', '/image/upload/')
        needsUpdate = true
      }

      // Generate new thumbnails if missing
      if (isVideo && (!project.thumbnail_url || project.thumbnail_url === project.media_url)) {
        newThumbnail = generateThumbnailFromVideo(project.media_url)
        needsUpdate = true
      }

      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ thumbnail_url: newThumbnail })
          .eq('id', project.id)

        if (!updateError) {
          updated++
          console.log(`✓ Updated thumbnail for: ${project.title}`)
        } else {
          console.error(`❌ Failed to update ${project.title}:`, updateError)
        }
      }
    }

    return NextResponse.json(
      { success: true, message: `Updated ${updated} projects with auto-generated thumbnails` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
