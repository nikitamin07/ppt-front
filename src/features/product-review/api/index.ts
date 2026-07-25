import { apiPost } from "@/shared/api";

export interface ProductReviewPayload {
  product_id: number;
  author: string;
  rating: number; // 1–5
  body: string;
}

// Ответ 204: отзыв уходит на модерацию, на сайте появится после одобрения в админке.
export function submitProductReview(payload: ProductReviewPayload): Promise<void> {
  return apiPost<void>("/comments", payload);
}
