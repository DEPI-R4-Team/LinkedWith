export type NotificationStatus = "unread" | "read";

export type NotificationType =
  | "application_received"
  | "application_accepted"
  | "application_rejected"
  | "session_reminder"
  | "session_completed"
  | "payment_held"
  | "payment_released"
  | "verification_update"
  | "instant_request";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};
