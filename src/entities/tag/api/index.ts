import { apiGet } from "@/shared/api";
import type { Tag } from "../model/types";

export function getTags(): Promise<Tag[]> {
  return apiGet<Tag[]>("/tags");
}
