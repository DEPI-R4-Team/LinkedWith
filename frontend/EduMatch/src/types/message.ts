export interface Message {
  id: number;
  session_id: number | null;
  application_id: number | null;
  sender_id: number;
  sender_name: string | null;
  sender_role: "student" | "instructor" | "admin" | string | null;
  message: string;
  created_at: string;
}

export interface MessageCreatePayload {
  session_id: string | number;
  message: string;
}

export interface ChatConversation {
  conversation_type: "application" | "session";
  application_id: number | null;
  session_id: number | null;
  request_id: number;
  request_title: string;
  request_type: string;
  status: string;
  other_user_id: number;
  other_user_name: string;
  label: string;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
}
