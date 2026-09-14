import { getCurrentUser } from "@/features/auth/api";
import { SignOutButton } from "@/components/profile/SignOutButton";

// TODO(profile step): replace with the full mockup - personal card, shop
// card / "start selling" state, saved addresses. This is intentionally
// minimal for now, just enough to verify the auth loop end to end.
export default async function ProfilePage() {
  const user = await getCurrentUser();

  // Middleware already redirects signed-out visits to /sign-in, so this
  // is a defensive fallback (e.g. the users row failed to provision), not
  // the primary guard
  if (!user) {
    return <div className="px-4 py-8 text-sm text-text-muted">Not signed in.</div>;
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-[420px] rounded-lg border border-border bg-surface-2 p-5">
        <div className="mb-1 text-sm font-medium text-text-primary">{user.displayName}</div>
        <div className="mb-6 text-xs text-text-muted">{user.email}</div>
        <SignOutButton />
      </div>
    </div>
  );
}
