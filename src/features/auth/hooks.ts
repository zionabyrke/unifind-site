"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function useAuthActions() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    // No further code runs here - the browser navigates away to Google
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return { signInWithGoogle, signOut };
}
