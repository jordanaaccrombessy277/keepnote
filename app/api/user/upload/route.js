import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let user
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    user = decoded
  } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'profiles-userkeepnote' }, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
      .end(buffer)
  })

  await prisma.user.update({
    where: { id: user.id },
    data: { profileImage: uploadResult.secure_url },
  })

  return NextResponse.json({ url: uploadResult.secure_url })
}
