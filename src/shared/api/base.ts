// В браузере API живёт на том же origin, что и сайт (его проксирует nginx), поэтому
// дефолт относительный. `next dev` на :3000 своего /api не имеет — там NEXT_PUBLIC_API_URL
// из .env указывает на nginx (:80). Значение подставляется на этапе сборки.
//
// На сервере (RSC, route handlers) относительный URL невозможен, а `localhost` внутри
// контейнера frontend — это сам frontend. Поэтому там отдельный runtime-адрес
// API_URL_INTERNAL (в compose = http://backend:80/api).
// `||`, а не `??`: пустая переменная окружения, а не отсутствующая
const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || "http://localhost/api"
    : process.env.NEXT_PUBLIC_API_URL || "/api";

// Origin для файлов, отданных бэкендом напрямую (/storage/...), а не через apiGet.
// Всегда браузерная переменная: <img src> резолвит браузер, а не Node — неважно, сервер
// или клиент собрал HTML. В проде NEXT_PUBLIC_API_URL относительный ("/api") → origin
// пустой, путь остаётся на том же origin, который nginx проксирует. В dev на :3000
// переменная указывает на nginx (http://localhost/api) → origin выдёргивается оттуда же,
// иначе бэкендовский /storage/... ушёл бы на сам dev-сервер и дал 404.
const ASSET_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/api\/?$/, "");

export function assetUrl(path: string | null): string | null {
  return path ? `${ASSET_ORIGIN}${path}` : null;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `${init?.method ?? "GET"} ${path} failed with ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const query = params
    ? "?" +
      Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&")
    : "";
  return request<T>(`${path}${query}`);
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}
