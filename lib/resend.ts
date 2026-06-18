import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
  console.warn('Resend API key not configured')
}

export const resend = apiKey ? new Resend(apiKey) : null

export async function sendBookingConfirmation(
  email: string,
  name: string,
  service: string,
  budget?: string
) {
  if (!resend) {
    console.warn('Resend not configured, email not sent')
    return
  }

  try {
    return await resend.emails.send({
      from: 'bookings@studio.com',
      to: email,
      subject: 'Booking Confirmation - Studio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">Thank you for your inquiry!</h2>
          <p>Hi ${name},</p>
          <p>We've received your booking request for <strong>${service}</strong>.</p>
          ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
          <p>Our team will review your request and get back to you within 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Best regards,<br/>
            <strong>Studio Team</strong>
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
