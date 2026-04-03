import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { PdfDocument } from '@/components/PdfDocument'
import fs from 'fs'
import path from 'path'
import prisma from '@/lib/prisma'
import getUserFromRequest from '@/lib/getUserFromRequest'

//traitement d'image local avant de l'afficher dans le pdf généré
const imagePath = path.join(process.cwd(), 'public', 'bg-dash.jpg')
const imageBuffer = fs.readFileSync(imagePath)
const imageBase64 = imageBuffer.toString('base64')
const imageDataUrl = `data:image/jpg;base64,${imageBase64}`

export async function GET(request) {
  const user = await getUserFromRequest(request)

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      email: true,
      loginCount: true,
      name: true,
      profileImage: true,
    },
  })

  const stream = await renderToStream(
    <PdfDocument
      name={userProfile.name || `John`}
      email={userProfile.email || `johndoe@gmail.com`}
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
