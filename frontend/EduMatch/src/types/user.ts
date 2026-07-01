export type UserRole = "student" | "instructor" | "admin";
export type RegisterRole = "student" | "instructor";
export type UserStatus = "active" | "suspended" | "pending";
export type InstructorVerificationStatus =
  | "pending_verification"
  | "verified"
  | "rejected"
  | "suspended";

export interface StudentProfile {
  id: number;
  user_id: number;
  phone: string | null;
  education_level: string | null;
  bio: string | null;
  profile_image: string | null;
  university: string | null;
  department: string | null;
  preferred_language: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface InstructorProfile {
  id: number;
  user_id: number;
  phone: string | null;
  specialization: string | null;
  skills: string | null;
  experience: string | null;
  bio: string | null;
  price_per_session: string | null;
  rating: string;
  verification_status: InstructorVerificationStatus;
  is_available_for_instant: boolean;
  last_seen_at: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  student_profile?: StudentProfile | null;
  instructor_profile?: InstructorProfile | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: RegisterRole;
  phone?: string;
  education_level?: string;
  specialization?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: "bearer";
  user: User;
}

export interface UserProfileUpdatePayload {
  full_name?: string;
  email?: string;
  phone?: string | null;
  bio?: string | null;
  profile_image?: string | null;
  education_level?: string | null;
  university?: string | null;
  department?: string | null;
  preferred_language?: string | null;
  location?: string | null;
  specialization?: string | null;
  skills?: string | null;
  experience?: string | null;
  price_per_session?: number | null;
  is_available_for_instant?: boolean;
}
