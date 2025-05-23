import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req : NextRequest ) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data
  } = await supabase.auth.getSession()

  // Auth routes that don't require session
  if (req.nextUrl.pathname.startsWith('/auth')) {
    return res
  }


  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}