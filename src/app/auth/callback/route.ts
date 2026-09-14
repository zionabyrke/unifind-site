import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/`);
    }

    // Surfaces the Auth Hook's "Only @bicol-u.edu.ph accounts..." message
    // (and any other exchange failure) as a query param the sign-in page reads
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}/sign-in?error=Missing auth code`);
}
