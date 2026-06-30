import { api } from "@/services/api";
import type { Application, ApplicationCreatePayload, ApplicationDecisionResponse } from "@/types/application";

export async function applyToRequest(payload: ApplicationCreatePayload): Promise<Application> {
  const response = await api.post<Application>("/applications", payload);
  return response.data;
}

export async function getMyApplications(): Promise<Application[]> {
  const response = await api.get<Application[]>("/applications/my");
  return response.data;
}

export async function getApplicationsForRequest(requestId: number): Promise<Application[]> {
  const response = await api.get<Application[]>(`/applications/request/${requestId}`);
  return response.data;
}

export async function acceptApplication(applicationId: number): Promise<ApplicationDecisionResponse> {
  const response = await api.put<ApplicationDecisionResponse>(`/applications/${applicationId}/accept`);
  return response.data;
}

export async function rejectApplication(applicationId: number): Promise<Application> {
  const response = await api.put<Application>(`/applications/${applicationId}/reject`);
  return response.data;
}
