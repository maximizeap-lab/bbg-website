import { NextResponse } from 'next/server'
import { createServiceSupabase } from '@/lib/supabase/server'
import { sendRegistrationReceipt } from '@/lib/resend'
import { formatCents } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServiceSupabase()

    const { data, error } = await supabase
      .from('registrations')
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        parent_name: body.parentName || null,
        parent_email: body.parentEmail || null,
        parent_phone: body.parentPhone || null,
        event_id: body.eventId || null,
        position: body.position || null,
        bats: body.bats || null,
        throws: body.throws || null,
        school: body.school || null,
        graduation_year: body.graduationYear || null,
        highlight_url: body.highlightUrl || null,
        instagram_handle: body.instagramHandle || null,
        gpa: body.gpa || null,
        heard_about: body.heardAbout || null,
        scholarship_requested: body.scholarshipRequested || false,
        scholarship_note: body.scholarshipNote || null,
        payment_status: body.isFree ? 'free' : 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
    }

    // Send confirmation email (don't fail registration if email fails)
    if (body.email) {
      try {
        await sendRegistrationReceipt({
          to: body.email,
          playerName: `${body.firstName} ${body.lastName}`,
          eventName: body.eventName || 'BBG Event',
          amount: body.amountPaid ? formatCents(body.amountPaid) : '$0.00',
          date: new Date().toLocaleDateString(),
        })
      } catch (emailErr) {
        console.error('Registration email failed:', emailErr)
      }
    }

    return NextResponse.json({ success: true, registration: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
