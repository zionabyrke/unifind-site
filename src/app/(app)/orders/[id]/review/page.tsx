import { ReviewForm } from "@/components/orders/ReviewForm";

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = await params;
  return <ReviewForm orderId={id} />;
}
