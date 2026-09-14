"use client";

import { useAuthActions } from "@/features/auth/hooks";

export function SignOutButton() {
  const { signOut } = useAuthActions();

  return (
    <button
      onClick={signOut}
      className="w-full rounded-lg border border-border-strong bg-transparent py-2.5 text-sm text-text-danger"
    >
      Sign out
    </button>
  );
}
