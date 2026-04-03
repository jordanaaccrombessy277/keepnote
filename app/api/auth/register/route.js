import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { callSendMail } from '@/lib/callSendMail'
import WelcomeEmailTemplate from '@/components/WelcomeEmailTemplate'

export async function POST(req) {
  const { name, email, password } = await req.json()

  if (!email || !name || password.trim().length < 6) {
    return NextResponse.json(
      {
        error:
          "Assurez-vous que le mot de passe soit d'au moins 6 caractères !",
      },
      { status: 400 }
    )
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const from = `Jordana - KeepNote <keepnote@jordanaaccro.com>`
  const to = [user.email]
  const subject = `Welcome on KeepNote !`
  const react = WelcomeEmailTemplate({ firstname: user.name })

  const send = callSendMail(from, to, subject, react)

  console.log(send)

  return NextResponse.json({ message: 'Inscription réussie' })
}
