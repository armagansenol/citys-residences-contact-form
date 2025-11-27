import { NextRequest, NextResponse } from "next/server"

// Force Node.js runtime for file system access required by the library
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const countryCode = searchParams.get("countryCode")

  if (!countryCode || typeof countryCode !== "string") {
    return NextResponse.json({ error: "Invalid country code" }, { status: 400 })
  }

  try {
    // Dynamic import to ensure proper module resolution at runtime
    const { getStatesOfCountry } = await import("@countrystatecity/countries")
    const states = await getStatesOfCountry(countryCode)
    return NextResponse.json(states)
  } catch (error) {
    console.error("Error fetching states:", error)
    return NextResponse.json({ error: "Failed to fetch states" }, { status: 500 })
  }
}
