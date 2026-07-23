import { apiGet, REFERENCE_TTL } from "@/shared/api";
import type { Manufacturer } from "../model/types";

/** Весь список, без пагинации: производителей десятки, а не тысячи. Справочник — кэшируем. */
export function getManufacturers(): Promise<Manufacturer[]> {
  return apiGet<Manufacturer[]>("/manufacturers", undefined, REFERENCE_TTL);
}
