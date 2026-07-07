import { apiPost } from "@/shared/api";

export interface OrderCallbackPayload {
  name: string;
  phone: string;
  comment?: string;
  source_url?: string; // страница, с которой отправлена заявка
}

export function submitOrderCallback(payload: OrderCallbackPayload): Promise<void> {
  return apiPost<void>("/callback", payload);
}
