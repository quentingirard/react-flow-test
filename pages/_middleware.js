// https://nextjs.org/docs/messages/nested-middleware
import { NextResponse } from 'next/server'

export function middleware(req) {

  // Avoid check for auth path
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  const request = true
  if (request) {
    return NextResponse.next()
  }

  return NextResponse.redirect(
    new URL(`/auth/signin?from=${req.nextUrl.pathname}`, req.url)
  )
}