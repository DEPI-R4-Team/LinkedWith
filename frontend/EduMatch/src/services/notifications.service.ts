import { api } from "@/services/api";
import type {
  Notification,
  NotificationMarkAllReadResponse,
  NotificationUnreadCountResponse,
} from "@/types/notification";

type GetNotificationsParams = {
  unread_only?: boolean;
  limit?: number;
  offset?: number;
};

export async function getMyNotifications(params?: GetNotificationsParams): Promise<Notification[]> {
  const response = await api.get<Notification[]>("/notifications/my", { params });
  return response.data;
}

export async function getUnreadCount(): Promise<NotificationUnreadCountResponse> {
  const response = await api.get<NotificationUnreadCountResponse>("/notifications/unread-count");
  return response.data;
}

export async function markNotificationRead(notificationId: number): Promise<Notification> {
  const response = await api.put<Notification>(`/notifications/${notificationId}/read`);
  return response.data;
}

export async function markAllNotificationsRead(): Promise<NotificationMarkAllReadResponse> {
  const response = await api.put<NotificationMarkAllReadResponse>("/notifications/read-all");
  return response.data;
}
