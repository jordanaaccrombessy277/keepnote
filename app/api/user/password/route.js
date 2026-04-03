import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function PUT(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const body = await request.json()
  const { oldpassword, password, confirmpassword } = body

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  })

  if (!user) {
    return NextResponse.json(
      {
        error: 'Utilisateur introuvable',
      },
      { status: 404 }
    )
  }

  const passwordMatch = await bcrypt.compare(oldpassword, user.password)

  if (!passwordMatch) {
    return NextResponse.json(
      { error: 'Mot de passe incorrect.' },
      { status: 401 }
    )
  }

  if (password.trim().length < 6) {
    return NextResponse.json(
      {
        error:
          "Assurez-vous que le nouveau mot de passe soit d'au moins 6 caractères !",
      },
      { status: 400 }
    )
  }

  if (password !== confirmpassword) {
    return NextResponse.json(
      {
        error: 'Confirmation du nouveau mot de passe erroné !',
      },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const updatedPasswordUser = await prisma.user.update({
    where: { id: decoded.id },
    data: { password: hashedPassword },
  })

  return NextResponse.json({
    message: 'Mot de passe mis à jour avec succès !',
  })
}
