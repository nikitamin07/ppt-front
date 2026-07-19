"use client";

import { useEffect } from "react";
import { apiPost } from "@/shared/api";

/**
 * Пинг раз на маунт рут-layout: считает заходы на сайт,
 * не пейдж-вью — клиентские переходы RootLayout не ремонтируют.
 */
export function TrackVisit() {
  useEffect(() => {
    apiPost<void>("/track-visit", {}).catch(() => {});
  }, []);

  return null;
}
