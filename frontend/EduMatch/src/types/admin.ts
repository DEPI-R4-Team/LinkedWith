export interface AdminStats {
  total_users: number;
  total_students: number;
  total_instructors: number;
  total_admins: number;
  suspended_users: number;
  total_requests: number;
  open_requests: number;
  waiting_payment_requests: number;
  completed_requests: number;
  cancelled_requests: number;
  total_applications: number;
  pending_applications: number;
  accepted_applications: number;
  rejected_applications: number;
  total_sessions: number;
  ready_sessions: number;
  active_sessions: number;
  completed_sessions: number;
  cancelled_sessions: number;
  total_payments: number;
  held_payments: number;
  released_payments: number;
  refunded_payments: number;
  total_reviews: number;
  average_platform_rating: number;
  total_wallet_pending_balance: string;
  total_wallet_available_balance: string;
  total_platform_revenue: string;
}

export interface AdminUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  student_profile: { education_level: string | null; phone: string | null } | null;
  instructor_profile: {
    specialization: string | null;
    rating: string | null;
    verification_status: string | null;
    price_per_session: string | null;
  } | null;
}

export interface AdminRequest {
  id: number;
  student_id: number;
  student_name: string | null;
  title: string;
  subject: string;
  description_preview: string;
  status: string;
  budget: string | null;
  created_at: string;
  applications_count: number;
  session_id: number | null;
}

export interface AdminSession {
  id: number;
  request_id: number;
  request_title: string | null;
  student_id: number;
  student_name: string | null;
  instructor_id: number;
  instructor_name: string | null;
  status: string;
  scheduled_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  completed_at: string | null;
  payment_status: string | null;
  created_at: string;
}

export interface AdminPayment {
  id: number;
  session_id: number;
  request_id: number;
  student_id: number;
  student_name: string | null;
  instructor_id: number;
  instructor_name: string | null;
  amount: string;
  platform_fee: string;
  total_amount: string;
  status: string;
  payment_method: string;
  paid_at: string | null;
  released_at: string | null;
  refunded_at: string | null;
  created_at: string;
}

export interface AdminReview {
  id: number;
  session_id: number;
  student_id: number;
  student_name: string | null;
  instructor_id: number;
  instructor_name: string | null;
  rating: number;
  comment: string | null;
  status: string;
  created_at: string;
}

export interface AdminListParams {
  role?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}
