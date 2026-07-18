"use client";

import { useEffect } from "react";
import { apiPost } from "@/shared/api";

/**
 * Пинг бэкенда раз на маунт рут-layout — считается «заход на сайт», не пейдж-вью:
 * клиентские переходы между страницами не ремонтируют RootLayout, так что счётчик
 * не растёт на каждый клик по ссылке.
 */
export function TrackVisit() {
  useEffect(() => {
    apiPost<void>("/track-visit", {}).catch(() => {});
  }, []);

  return null;
}
