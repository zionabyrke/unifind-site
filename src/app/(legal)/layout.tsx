import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8">{children}</div>
    </div>
  );
}
