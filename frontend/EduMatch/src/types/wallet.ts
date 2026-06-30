export type WalletTransactionType = "hold" | "release" | "refund" | "withdraw";

export interface InstructorWallet {
  id: number;
  instructor_id: number;
  pending_balance: string;
  available_balance: string;
  total_earned: string;
  updated_at: string;
  instructor_name: string | null;
}

export interface WalletTransaction {
  id: number;
  instructor_id: number;
  payment_id: number | null;
  type: WalletTransactionType;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}
