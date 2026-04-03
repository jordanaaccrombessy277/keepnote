import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json({
    message: 'Déconnexion effectuée.',
  })

  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  })

  return response
}
