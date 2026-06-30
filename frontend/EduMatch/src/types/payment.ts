export type PaymentStatus = "pending" | "held" | "released" | "refunded" | "cancelled" | "disputed";
export type PaymentMethod = "card_simulation" | "wallet_simulation" | "cash_simulation";

export interface Payment {
  id: number;
  session_id: number;
  request_id: number;
  student_id: number;
  instructor_id: number;
  amount: string;
  platform_fee: string;
  total_amount: string;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  paid_at: string | null;
  released_at: string | null;
  refunded_at: string | null;
  created_at: string;
  updated_at: string;
  request_title: string | null;
  student_name: string | null;
  instructor_name: string | null;
  session_status?: string | null;
  request_status?: string | null;
}
