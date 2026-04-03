import { NextResponse } from 'next/server'
import { createServiceSupabase } from '@/lib/supabase/server'
import { newsletterSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = newsletterSchema.parse(body)

    const supabase = createServiceSupabase()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, is_active: true }, { onConflict: 'email' })

    if (error) {
      console.error('Newsletter subscribe error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
