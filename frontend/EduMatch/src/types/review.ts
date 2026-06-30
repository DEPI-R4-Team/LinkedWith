export interface Review {
  id: number;
  session_id: number;
  student_id: number;
  instructor_id: number;
  rating: number;
  comment: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  student_name: string | null;
  instructor_name: string | null;
  session_title: string | null;
}

export interface ReviewCreatePayload {
  session_id: number;
  rating: number;
  comment?: string;
}
