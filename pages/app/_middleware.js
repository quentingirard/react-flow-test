import { NextResponse } from 'next/server'

export function middleware(req) {
  console.log('dans le middlware')
  const request = true
  if (request) {
    return NextResponse.next()
  }

  return NextResponse.redirect(
    new URL(`/auth/signin?from=${req.nextUrl.pathname}`, req.url)
  )
}