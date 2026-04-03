import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=no-token', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(
      new URL('/login?error=invalid-token', request.url)
    )
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
