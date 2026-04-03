import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import getUserFromRequest from '@/lib/getUserFromRequest'

export async function POST(request) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json()
  const { title, content } = body

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Titre et contenu requis' },
      { status: 400 }
    )
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId: user.id,
    },
  })

  return NextResponse.json({ note }, { status: 201 })
}

export async function GET(request) {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ notes })
}
