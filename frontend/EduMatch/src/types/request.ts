export type RequestStatus =
  | "open"
  | "instant_open"
  | "instant_accepted"
  | "pending_instant"
  | "accepted"
  | "waiting_payment"
  | "paid"
  | "in_session"
  | "completed"
  | "cancelled"
  | "expired";

export interface LearningRequest {
  id: number;
  student_id: number;
  title: string;
  subject: string;
  description: string;
  level: string | null;
  request_type: string;
  session_mode: string;
  session_type: string;
  preferred_datetime: string | null;
  base_price: string | null;
  discount_per_extra_student: string | null;
  minimum_price: string | null;
  final_price_per_student: string | null;
  max_students: number | null;
  max_participants: number | null;
  min_participants: number | null;
  min_price_per_student: string | null;
  current_price_per_student: string | null;
  group_owner_id: number | null;
  group_status: string | null;
  status: RequestStatus;
  accepted_instructor_id: number | null;
  accepted_at: string | null;
  urgency_level: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  student_name: string | null;
  accepted_instructor_name: string | null;
  applications_count: number;
}

export interface LearningRequestDetail extends LearningRequest {
  applications: import("./application").Application[];
}

export interface RequestCreatePayload {
  title: string;
  subject: string;
  description: string;
  level?: string;
  request_type?: string;
  session_mode?: string;
  session_type?: string;
  preferred_datetime?: string;
  base_price?: number;
  discount_per_extra_student?: number;
  minimum_price?: number;
  final_price_per_student?: number;
  max_students?: number;
  max_participants?: number;
  min_participants?: number;
  min_price_per_student?: number;
  current_price_per_student?: number;
}
