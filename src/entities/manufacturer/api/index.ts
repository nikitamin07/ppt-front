import { apiGet } from "@/shared/api";
import type { Manufacturer } from "../model/types";

/** Весь список, без пагинации: производителей десятки, а не тысячи. */
export function getManufacturers(): Promise<Manufacturer[]> {
  return apiGet<Manufacturer[]>("/manufacturers");
}
