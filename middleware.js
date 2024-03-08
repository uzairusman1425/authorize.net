import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export default async function middleware(req, res) {

  const path = req.nextUrl.pathname
  const token = await getToken({ req });

  const isPublicPath =  path === '/'

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/details', req.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
}

export const config = {
  matcher: [
    "/details",
  
  ],
};