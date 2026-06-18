import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''
const resendKey = process.env.RESEND_API_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)
const resend = new Resend(resendKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, budget, date, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          phone,
          service,
          budget,
          date,
          notes,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      )
    }

    // Send confirmation email to client via Resend
    if (resendKey) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Booking Confirmation - Studio',
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Hi ${name},</p>
            <p>We've received your booking request for <strong>${service}</strong>.</p>
            <p>Budget: ${budget || 'Not specified'}</p>
            <p>Our team will review your request and get back to you within 24 hours.</p>
            <p>Best regards,<br/>Studio Team</p>
          `,
        })
        console.log('✓ Client confirmation email sent to:', email)
      } catch (emailError) {
        console.error('❌ Failed to send client email:', emailError)
      }

      // Send notification email to studio owner
      const studioEmail = process.env.STUDIO_EMAIL
      if (studioEmail) {
        try {
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: studioEmail,
            subject: `New Booking Request - ${service}`,
            html: `
              <h2>New Booking Request</h2>
              <p><strong>Client Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
              <p><strong>Date:</strong> ${date || 'Not specified'}</p>
              <p><strong>Notes:</strong> ${notes || 'None'}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">Received at: ${new Date().toISOString()}</p>
            `,
          })
          console.log('✓ Studio notification email sent to:', studioEmail)
        } catch (emailError) {
          console.error('❌ Failed to send studio email:', emailError)
        }
      } else {
        console.warn('⚠️  STUDIO_EMAIL not configured')
      }
    } else {
      console.warn('⚠️  RESEND_API_KEY not configured')
    }

    return NextResponse.json(
      { success: true, booking: data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
