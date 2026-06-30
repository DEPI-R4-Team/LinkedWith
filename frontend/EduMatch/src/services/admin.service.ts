import { api } from "@/services/api";
import type { AdminListParams, AdminPayment, AdminRequest, AdminReview, AdminSession, AdminStats, AdminUser } from "@/types/admin";

export async function getAdminStats(): Promise<AdminStats> {
  const response = await api.get<AdminStats>("/admin/stats");
  return response.data;
}

export async function getAdminUsers(params?: AdminListParams): Promise<AdminUser[]> {
  const response = await api.get<AdminUser[]>("/admin/users", { params });
  return response.data;
}

export async function getAdminRequests(params?: AdminListParams): Promise<AdminRequest[]> {
  const response = await api.get<AdminRequest[]>("/admin/requests", { params });
  return response.data;
}

export async function getAdminSessions(params?: AdminListParams): Promise<AdminSession[]> {
  const response = await api.get<AdminSession[]>("/admin/sessions", { params });
  return response.data;
}

export async function getAdminPayments(params?: AdminListParams): Promise<AdminPayment[]> {
  const response = await api.get<AdminPayment[]>("/admin/payments", { params });
  return response.data;
}

export async function getAdminReviews(params?: AdminListParams & { instructor_id?: number; student_id?: number }): Promise<AdminReview[]> {
  const response = await api.get<AdminReview[]>("/admin/reviews", { params });
  return response.data;
}

export async function verifyInstructor(instructorId: number): Promise<AdminUser> {
  const response = await api.put<AdminUser>(`/admin/instructors/${instructorId}/verify`);
  return response.data;
}

export async function rejectInstructor(instructorId: number, reason?: string): Promise<AdminUser> {
  const response = await api.put<AdminUser>(`/admin/instructors/${instructorId}/reject`, { reason });
  return response.data;
}

export async function suspendUser(userId: number, reason?: string): Promise<AdminUser> {
  const response = await api.put<AdminUser>(`/admin/users/${userId}/suspend`, { reason });
  return response.data;
}

export async function activateUser(userId: number): Promise<AdminUser> {
  const response = await api.put<AdminUser>(`/admin/users/${userId}/activate`);
  return response.data;
}

export async function refundPayment(paymentId: number): Promise<AdminPayment> {
  const response = await api.post<AdminPayment>(`/admin/payments/${paymentId}/refund`);
  return response.data;
}

export async function releasePayment(paymentId: number): Promise<AdminPayment> {
  const response = await api.post<AdminPayment>(`/admin/payments/${paymentId}/release`);
  return response.data;
}

export async function hideReview(reviewId: number): Promise<AdminReview> {
  const response = await api.put<AdminReview>(`/admin/reviews/${reviewId}/hide`);
  return response.data;
}

export async function showReview(reviewId: number): Promise<AdminReview> {
  const response = await api.put<AdminReview>(`/admin/reviews/${reviewId}/show`);
  return response.data;
}
