import { api } from "@/services/api";
import type {
  InstantAcceptResponse,
  InstantAvailabilityPayload,
  InstantRequest,
  InstantRequestCreatePayload,
} from "@/types/instantRequest";

export async function createInstantRequest(data: InstantRequestCreatePayload): Promise<InstantRequest> {
  const response = await api.post<InstantRequest>("/instant-requests", data);
  return response.data;
}

export async function getOpenInstantRequests(params?: { subject?: string }): Promise<InstantRequest[]> {
  const response = await api.get<InstantRequest[]>("/instant-requests", { params });
  return response.data;
}

export async function getMyInstantRequests(): Promise<InstantRequest[]> {
  const response = await api.get<InstantRequest[]>("/instant-requests/my");
  return response.data;
}

export async function getInstantRequestById(id: number): Promise<InstantRequest> {
  const response = await api.get<InstantRequest>(`/instant-requests/${id}`);
  return response.data;
}

export async function acceptInstantRequest(id: number): Promise<InstantAcceptResponse> {
  const response = await api.post<InstantAcceptResponse>(`/instant-requests/${id}/accept`);
  return response.data;
}

export async function cancelInstantRequest(id: number): Promise<InstantRequest> {
  const response = await api.post<InstantRequest>(`/instant-requests/${id}/cancel`);
  return response.data;
}

export async function updateInstantAvailability(isAvailable: boolean): Promise<InstantAvailabilityPayload> {
  const response = await api.put<InstantAvailabilityPayload>("/instant-requests/availability", {
    is_available_for_instant: isAvailable,
  });
  return response.data;
}
