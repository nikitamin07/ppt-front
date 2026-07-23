import { apiGet, REFERENCE_TTL } from "@/shared/api";
import type { Tag } from "../model/types";

/** Справочник тем блога — кэшируем. */
export function getTags(): Promise<Tag[]> {
  return apiGet<Tag[]>("/tags", undefined, REFERENCE_TTL);
}
