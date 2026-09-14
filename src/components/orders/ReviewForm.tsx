"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { submitReviewAction } from "@/features/reviews/actions";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export function ReviewForm({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const effective = hover || rating;

  const submit = () => {
    if (rating === 0) return;
    setError(null);
    startTransition(async () => {
      const result = await submitReviewAction(orderId, rating, comment);
      if (!result.ok) setError(result.error ?? "Something went wrong.");
      else router.push("/orders");
    });
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-8">
      <h1 className="mb-1 text-[15px] font-medium text-text-primary">Leave a review</h1>
      <p className="mb-5 text-xs text-text-muted">How was your experience with this shop?</p>

      <div className="mb-1.5 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i)}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
          >
            <Star
              size={26}
              fill={i <= effective ? "currentColor" : "none"}
              className={i <= effective ? "text-text-warning" : "text-border-strong"}
            />
          </button>
        ))}
      </div>
      <p className="mb-5 h-4 text-center text-[11px] text-text-muted">
        {rating ? RATING_LABELS[rating] : "Tap a star to rate"}
      </p>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)"
        className="mb-4 h-20 w-full resize-none rounded-lg border border-border bg-surface-1 p-2.5 text-sm text-text-primary placeholder:text-text-muted"
      />

      {error && <p className="mb-3 text-xs text-text-danger">{error}</p>}

      <button
        disabled={rating === 0 || isPending}
        onClick={submit}
        className="h-11 w-full rounded-lg bg-accent text-sm text-white disabled:opacity-45"
      >
        {isPending ? "Submitting..." : "Submit review"}
      </button>
    </div>
  );
}
