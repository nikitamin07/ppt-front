// Браузер — относительный /api (nginx проксирует); сервер — API_URL_INTERNAL:
// там относительный URL невозможен. Детали — CLAUDE.md, «API layer».
const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || "http://localhost/api"
    : process.env.NEXT_PUBLIC_API_URL || "/api";

// Origin для бэкендовских файлов (/storage/...): в dev на :3000
// без него <img src> бил бы в dev-сервер и давал 404.
const ASSET_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/api\/?$/, "");

export function assetUrl(path: string | null): string | null {
  return path ? `${ASSET_ORIGIN}${path}` : null;
}

/** Заглушка для карточек/детальных страниц товара и статьи, пока в админке не проставлена картинка. */
export const NO_IMAGE_SRC = "/img/no_image.jpg";

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
