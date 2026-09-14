import Link from "next/link";
import { Home, Heart, Store, MessageCircle, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-border bg-surface-2 py-2 md:hidden">
      {tabs.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="flex flex-col items-center gap-0.5 text-text-muted">
          <Icon size={20} />
          <span className="text-[9px]">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
