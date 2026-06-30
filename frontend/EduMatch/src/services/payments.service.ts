import { api } from "@/services/api";
import type { Payment, PaymentMethod } from "@/types/payment";

export async function payForSession(sessionId: number, paymentMethod: PaymentMethod): Promise<Payment> {
  const response = await api.post<Payment>(`/payments/session/${sessionId}/pay`, {
    payment_method: paymentMethod,
  });
  return response.data;
}

export async function getMyPayments(): Promise<Payment[]> {
  const response = await api.get<Payment[]>("/payments/my");
  return response.data;
}

export async function getPaymentBySession(sessionId: number): Promise<Payment> {
  const response = await api.get<Payment>(`/payments/session/${sessionId}`);
  return response.data;
}

export async function releasePayment(paymentId: number): Promise<Payment> {
  const response = await api.post<Payment>(`/payments/${paymentId}/release`);
  return response.data;
}
