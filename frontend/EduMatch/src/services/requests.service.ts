import { api } from "@/services/api";
import type { LearningRequest, LearningRequestDetail, RequestCreatePayload } from "@/types/request";

export async function createRequest(payload: RequestCreatePayload): Promise<LearningRequest> {
  const response = await api.post<LearningRequest>("/requests", payload);
  return response.data;
}

export async function getMyRequests(): Promise<LearningRequest[]> {
  const response = await api.get<LearningRequest[]>("/requests/my");
  return response.data;
}

export async function getRequests(params?: { subject?: string; status?: string }): Promise<LearningRequest[]> {
  const response = await api.get<LearningRequest[]>("/requests", { params });
  return response.data;
}

export async function getRequestById(requestId: number): Promise<LearningRequestDetail> {
  const response = await api.get<LearningRequestDetail>(`/requests/${requestId}`);
  return response.data;
}

export async function cancelRequest(requestId: number): Promise<LearningRequest> {
  const response = await api.post<LearningRequest>(`/requests/${requestId}/cancel`);
  return response.data;
}
