import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { NotesDocument } from '@/components/NotesDocument'
import fs from 'fs'
import path from 'path'
import prisma from '@/lib/prisma'
import getUserFromRequest from '@/lib/getUserFromRequest'

//traitement d'image local avant de l'afficher dans le pdf généré
const imagePath = path.join(process.cwd(), 'public', 'bg-dash.jpg')
const imageBuffer = fs.readFileSync(imagePath)
const imageBase64 = imageBuffer.toString('base64')
const imageDataUrl = `data:image/jpg;base64,${imageBase64}`

export async function POST(request) {
  const body = await request.json()
  const { all, fromDate, toDate } = body

  const start = new Date(fromDate)
  const end = new Date(toDate)
  end.setHours(23, 59, 59, 999)

  const user = await getUserFromRequest(request)

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      profileImage: true,
    },
  })

  let notes = []

  if (all === true) {
    notes = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })
  } else if (fromDate != '' && toDate != '') {
    notes = await prisma.note.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { createdAt: 'asc' },
    })
  } else {
    return NextResponse.json(
      {
        error: 'Filtrez les champs !',
      },
      { status: 400 }
    )
  }

  const stream = await renderToStream(
    <NotesDocument
      name={userProfile.name || `John Doe`}
      notes={notes}
      profileImage={userProfile.profileImage || imageDataUrl}
    />
  )

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=${userProfile.name}-profile-keepnote.pdf`,
    },
  })
}
