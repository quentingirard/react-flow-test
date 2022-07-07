// https://nextjs.org/docs/messages/nested-middleware
import { NextResponse } from 'next/server'

export function middleware(req, res) {
  const sessions = req.cookies.get('sessions', { req, res })

  if (!req.nextUrl.pathname.startsWith('/auth') && !req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('.')) {
    if (!sessions) {
      return NextResponse.redirect(
        new URL(`/auth/signin`, req.url)
      )
    }
  }

  return NextResponse.next()
}