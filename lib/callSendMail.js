import { Resend } from 'resend'
import { NextResponse } from 'next/server'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function callSendMail(from, to, subject, react) {
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      react: react,
    })

    if (error) {
      return NextResponse.json(
        { message: 'Envoi échoué !', error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email envoyé avec succès !', data },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Envoi échoué encore !', error },
      { status: 500 }
    )
  }
}
