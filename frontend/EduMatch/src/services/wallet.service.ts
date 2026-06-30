import { api } from "@/services/api";
import type { InstructorWallet, WalletTransaction } from "@/types/wallet";

export async function getInstructorWallet(): Promise<InstructorWallet> {
  const response = await api.get<InstructorWallet>("/wallet/instructor");
  return response.data;
}

export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  const response = await api.get<WalletTransaction[]>("/wallet/transactions");
  return response.data;
}
