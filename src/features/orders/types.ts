import type { ListingCondition } from "@/features/listings/types";

export type OrderStatus = "pending" | "accepted" | "completed" | "rejected" | "cancelled";

export interface OrderListItem {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  orderDate: string; // ISO
  listingTitle: string;
  coverImageUrl: string | null;
  /** Shop name (buyer's view) or buyer display name (seller's view) */
  counterpartName: string;
  /** Only meaningful for completed orders in the buyer's own history */
  reviewed: boolean;
}

export interface OrderLine {
  listingTitle: string;
  condition: ListingCondition;
  qty: number;
  unitPrice: number;
  imageUrl: string | null;
}

export interface OrderDetail {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  orderDate: string;
  isBuyer: boolean;
  counterpartName: string;
  address: { line1: string; line2: string | null; city: string };
  lines: OrderLine[];
  reviewed: boolean;
}
