import Link from "next/link";
import { Meh } from "lucide-react";

export function UnavailableListing() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <Meh size={30} className="text-text-muted" />
      <p className="text-sm text-text-primary">This listing isn&apos;t available anymore</p>
      <p className="max-w-xs text-xs text-text-muted">
        It may have sold out or been taken down by the seller.
      </p>
      <Link
        href="/"
        className="mt-3 rounded-lg bg-accent px-5 py-2 text-sm text-white"
      >
        Back to browsing
      </Link>
    </div>
  );
}
