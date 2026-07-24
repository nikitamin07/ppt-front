import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Общая карточка ссылки: Next подставляет её всюду, где страница не задала свою og:image.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ППТ.бел — материалы для строительства и утепления";

const INK = "#1b1b18";
const PAPER = "#f2f0ea";
const LINE = "#ddd9cd";
const MUTED = "#6b6860";
const SAFETY = "#ff5a1f";

const font = (name: string) => readFile(join(process.cwd(), "public/fonts", name));

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([font("Involve-Regular.ttf"), font("Involve-SemiBold.ttf")]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: PAPER }}>
        <div style={{ display: "flex", height: 14, backgroundColor: SAFETY }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", padding: 72 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", width: 56, height: 3, backgroundColor: SAFETY, marginRight: 20 }} />
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 6, color: SAFETY }}>
                ППТ.БЕЛ · СКЛАД СТРОИТЕЛЬНЫХ МАТЕРИАЛОВ
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 72,
                fontWeight: 600,
                lineHeight: 1.18,
                color: INK,
                marginTop: 44,
              }}
            >
              <div style={{ display: "flex" }}>Материалы для стройки</div>
              <div style={{ display: "flex" }}>и утепления — в наличии</div>
            </div>

            <div style={{ display: "flex", fontSize: 32, color: MUTED, marginTop: 36 }}>
              Пенопласт · XPS · Минвата · Блоки · Сухие смеси
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", height: 1, backgroundColor: LINE }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: INK, marginTop: 28 }}>
              <div style={{ display: "flex" }}>Минск, ул. Кнорина 50А</div>
              <div style={{ display: "flex" }}>Доставка по Беларуси</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Involve", data: regular, weight: 400, style: "normal" },
        { name: "Involve", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
