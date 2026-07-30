import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

function createRedirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return createRedirect(
      request,
      `/sign-in?error=${encodeURIComponent("Unable to confirm your account.")}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return createRedirect(
      request,
      `/sign-in?error=${encodeURIComponent("Unable to confirm your account.")}`,
    );
  }

  return createRedirect(request, "/");
}
