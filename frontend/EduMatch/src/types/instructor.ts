export type InstructorVerificationStatus =
  | "pending_verification"
  | "verified"
  | "rejected"
  | "suspended";

export interface InstructorListItem {
  id: number;
  full_name: string;
  specialization: string | null;
  skills: string | null;
  experience: string | null;
  bio: string | null;
  price_per_session: string | null;
  rating: string;
  verification_status: InstructorVerificationStatus;
  is_available_for_instant: boolean;
  profile_image: string | null;
  created_at: string;
}

export interface InstructorDetail extends InstructorListItem {
  total_reviews: number;
  completed_sessions_count: number;
}

export interface InstructorSearchParams {
  search?: string;
  specialization?: string;
  min_rating?: number;
  max_price?: number;
  availability?: boolean;
  verified_only?: boolean;
}
