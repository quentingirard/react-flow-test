// https://nextjs.org/docs/messages/nested-middleware
import { NextResponse } from 'next/server'

export function middleware(request) {

  console.log("middleware ICI ?",request.nextUrl.pathname)

  if (!request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/_next') && !request.nextUrl.pathname.includes('.')) {
    return NextResponse.redirect(
      new URL(`/auth/signin`, request.url)
    )
  }

  return NextResponse.next()

  // // Avoid check for auth path
  // if (request.nextUrl.pathname.startsWith('/auth')) {
  //   return NextResponse.next()
  // } else {
  //   return NextResponse.redirect(
  //     new URL(`/auth/signin`, request.url)
  //   )
  // }
}