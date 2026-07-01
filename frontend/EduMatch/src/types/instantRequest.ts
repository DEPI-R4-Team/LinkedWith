import type { Session } from "@/types/session";

export type InstantRequestStatus =
  | "instant_open"
  | "instant_accepted"
  | "waiting_payment"
  | "paid"
  | "in_session"
  | "completed"
  | "cancelled"
  | "expired";

export interface InstantRequest {
  id: number;
  title: string;
  subject: string;
  description: string;
  student_id: number;
  student_name: string | null;
  request_type: "instant";
  status: InstantRequestStatus;
  budget: string | null;
  skill_level: string | null;
  session_mode: string;
  session_type: string;
  urgency_level: string | null;
  expires_at: string | null;
  accepted_instructor_id: number | null;
  accepted_instructor_name: string | null;
  accepted_at: string | null;
  session_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface InstantRequestCreatePayload {
  title: string;
  subject: string;
  description: string;
  budget: number;
  skill_level?: string;
  session_mode?: string;
  session_type?: string;
  urgency_level?: string;
  expires_in_minutes?: number;
}

export interface InstantAcceptResponse {
  request: InstantRequest;
  session: Session;
}

export interface InstantAvailabilityPayload {
  is_available_for_instant: boolean;
}
