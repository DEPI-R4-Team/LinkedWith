export interface Message {
  id: number;
  session_id: number;
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
