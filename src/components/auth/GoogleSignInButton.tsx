"use client";

import { useAuthActions } from "@/features/auth/hooks";

export function GoogleSignInButton() {
  const { signInWithGoogle } = useAuthActions();

  return (
    <button
      onClick={signInWithGoogle}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-accent text-sm text-white"
    >
      <img src="/google.png" alt="" className="h-[18px] w-[18px]" />
      Continue with Google
    </button>
  );
}
