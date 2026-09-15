import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

interface SignInPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex justify-center px-4 py-12 md:py-24">
      <div className="w-full max-w-[360px] rounded-xl border border-border bg-surface-2 p-10 text-center">
        <div className="mb-1 text-lg font-medium text-text-primary">{siteConfig.name}</div>
        <div className="mb-8 text-[13px] text-text-secondary">{siteConfig.tagline}</div>

        <GoogleSignInButton />

        {error ? (
          <div className="mt-3 rounded-lg bg-bg-danger p-2.5 text-left text-xs text-text-danger">
            {error}
          </div>
        ) : (
          <div className="mt-3 text-xs text-text-muted">Only your university email works here.</div>
        )}

        <div className="mt-8 text-[11px] text-text-muted">
          By continuing you agree to the{" "}
          <Link href="/terms" target="_blank" className="text-text-secondary underline">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="text-text-secondary underline">
            privacy policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
