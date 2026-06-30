import { api } from "@/services/api";
import type { InstructorDetail, InstructorListItem, InstructorSearchParams } from "@/types/instructor";
import type { Review } from "@/types/review";

export async function getInstructors(params?: InstructorSearchParams): Promise<InstructorListItem[]> {
  const response = await api.get<InstructorListItem[]>("/users/instructors", { params });
  return response.data;
}

export async function getInstructorById(id: number): Promise<InstructorDetail> {
  const response = await api.get<InstructorDetail>(`/users/instructors/${id}`);
  return response.data;
}

export async function getInstructorReviews(id: number): Promise<Review[]> {
  const response = await api.get<Review[]>(`/reviews/instructor/${id}`);
  return response.data;
}
