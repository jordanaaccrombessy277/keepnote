import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import getUserFromRequest from '@/lib/getUserFromRequest'

export async function GET(request, { params }) {
  const user = getUserFromRequest(request)
  if (!user)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const note = await prisma.note.findUnique({
    where: { id: parseInt(params.id), userId: user.id },
  })

  if (!note)
    return NextResponse.json({ error: 'Note introuvable' }, { status: 404 })

  return NextResponse.json({ note })
}

export async function PUT(request, { params }) {
  const user = getUserFromRequest(request)
  if (!user)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await request.json()
  const { title, content } = body

  const note = await prisma.note.updateMany({
    where: { id: parseInt(params.id), userId: user.id },
    data: { title, content },
  })

  if (note.count === 0)
    return NextResponse.json(
      { error: 'Note introuvable ou non autorisée' },
      { status: 404 }
    )

  return NextResponse.json({ message: 'Note mise à jour' })
}

export async function DELETE(request, { params }) {
  const user = getUserFromRequest(request)
  if (!user)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const note = await prisma.note.deleteMany({
    where: { id: parseInt(params.id), userId: user.id },
  })

  if (note.count === 0)
    return NextResponse.json(
      { error: 'Note introuvable ou non autorisée' },
      { status: 404 }
    )

  return NextResponse.json({ message: 'Note supprimée' })
}
