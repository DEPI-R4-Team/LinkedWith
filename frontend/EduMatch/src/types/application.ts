export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
  id: number;
  request_id: number;
  instructor_id: number;
  message: string;
  proposed_price: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  instructor_name: string | null;
  instructor_specialization: string | null;
  instructor_rating: string | null;
  request_title: string | null;
  student_name: string | null;
}

export interface ApplicationCreatePayload {
  request_id: number;
  message: string;
  proposed_price: number;
}

export interface ApplicationDecisionResponse {
  application: Application;
  session: import("./session").Session | null;
}
