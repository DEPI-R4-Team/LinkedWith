import { api } from "@/services/api";
import type { Review, ReviewCreatePayload } from "@/types/review";

export async function createReview(data: ReviewCreatePayload): Promise<Review> {
  const response = await api.post<Review>("/reviews", data);
  return response.data;
}

export async function getMyReviews(): Promise<Review[]> {
  const response = await api.get<Review[]>("/reviews/my");
  return response.data;
}

export async function getInstructorReviews(instructorId: number): Promise<Review[]> {
  const response = await api.get<Review[]>(`/reviews/instructor/${instructorId}`);
  return response.data;
}
