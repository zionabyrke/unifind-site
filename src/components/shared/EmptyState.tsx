import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center gap-2 py-16 text-center">
      <Icon size={28} className="text-text-muted" />
      <p className="text-sm text-text-primary">{title}</p>
      {description && <p className="text-xs text-text-muted">{description}</p>}
    </div>
  );
}
