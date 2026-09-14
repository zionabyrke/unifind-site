import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Heart, MessageCircle, Store } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Server component shell. Nothing here needs client state except
 * ThemeToggle, which is isolated so this stays a server component
 */
export function Navbar() {
  return (
    <header className="hidden items-center gap-4 border-b border-border bg-surface-2 px-6 py-3 md:flex">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src={siteConfig.logo.light} alt={siteConfig.name} width={80} height={80} className="dark:hidden" />
        <Image src={siteConfig.logo.dark} alt={siteConfig.name} width={80} height={80} className="hidden dark:block" />
      </Link>

      <form action="/search" className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-border bg-surface-1 px-3">
        <Search size={16} className="text-text-muted" />
        <input
          name="q"
          type="text"
          placeholder="Search listings"
          className="h-full flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
      </form>

      <nav className="flex items-center gap-4 text-text-primary">
        <Link href="/notifications" aria-label="Notifications"><Bell size={19} /></Link>
        <Link href="/wishlist" aria-label="Wishlist"><Heart size={19} /></Link>
        <Link href="/messages" aria-label="Messages"><MessageCircle size={19} /></Link>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm text-white"
        >
          <Store size={15} /> Shop
        </Link>
      </nav>

      <Link href="/profile" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-bg text-[11px] font-medium text-accent">
        {/* Replace with the signed-in user's avatar_url when wired to auth */}
        U
      </Link>

      <ThemeToggle />
    </header>
  );
}
