import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

function fixThumbnailUrl(url: string): string {
  if (url.includes('/video/upload/f_auto')) {
    return url.replace('/video/upload/', '/image/upload/')
  }
  return url
}

async function migrate() {
  try {
    const { data: projects } = await supabase.from('projects').select('*')

    if (!projects) return

    for (const project of projects) {
      if (project.thumbnail_url?.includes('/video/upload/')) {
        const fixed = fixThumbnailUrl(project.thumbnail_url)
        await supabase.from('projects').update({ thumbnail_url: fixed }).eq('id', project.id)
        console.log(`✓ Fixed: ${project.title}`)
      }
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

migrate()
