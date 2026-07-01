export type NotificationType =
  | "application_received"
  | "application_accepted"
  | "application_rejected"
  | "application_message_received"
  | "payment_received"
  | "payment_released"
  | "payment_refunded"
  | "session_started"
  | "session_marked_completed"
  | "session_completed"
  | "review_received"
  | "instructor_verified"
  | "instructor_rejected"
  | "user_suspended"
  | "user_activated"
  | "admin_action"
  | "system"
  | string;

export type Notification = {
  id: number;
  user_id: number;
  type: NotificationType;
  title: string;
  message: string;
  link_url: string | null;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
};

export type NotificationUnreadCountResponse = {
  unread_count: number;
};

export type NotificationMarkAllReadResponse = {
  updated_count: number;
};
