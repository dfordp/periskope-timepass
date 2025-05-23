import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req : NextRequest ) {
  const res = NextResponse.next()
  const cookieStore = await cookies()
  const email = cookieStore.get('email')


  // Auth routes that don't require session
  if (req.nextUrl.pathname.startsWith('/auth')) {
    return res;
  }

 
   
  if (!email && req.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}