import { NextResponse } from 'next/server'
import { createServiceSupabase } from '@/lib/supabase/server'
import { contactSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const supabase = createServiceSupabase()

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      })

    if (error) {
      console.error('Contact form error:', error)
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
