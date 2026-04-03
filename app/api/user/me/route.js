import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function GET(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        email: true,
        loginCount: true,
        name: true,
        profileImage: true,
        role: true,
      },
    })
    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }
}

export async function PUT(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const body = await request.json()
  const { name, email } = body

  const propers = {
    ...(name && { name }),
    ...(email && { email }),
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await prisma.user.updateMany({
    where: { id: decoded.id },
    data: propers, // seul le champs à modifié doit etre mentionné dans la req
  })

  return NextResponse.json({ message: 'Mise à jour effectué !' })
}
