import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * NEXT.JS 16 — Cookies API is async.
 * Must use: const cookieStore = await cookies();
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {
          // no-op
        },
        remove() {
          // no-op
        },
      },
    }
  );
}
