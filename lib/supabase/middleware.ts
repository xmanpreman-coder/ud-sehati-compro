import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // No authentication required - this is a public company profile website
  // Admin area is protected by AdminGuard component
  return NextResponse.next({
    request,
  })
}
