import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Иконка для «на экран Домой» в iOS. Размер задан Apple, менять не нужно.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const SAFETY = "#ff5a1f";
const PAPER = "#f2f0ea";

export default async function AppleIcon() {
  const involve = await readFile(join(process.cwd(), "public/fonts/Involve-SemiBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: SAFETY,
          color: PAPER,
          fontSize: 58,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        ППТ
      </div>
    ),
    { ...size, fonts: [{ name: "Involve", data: involve, weight: 600, style: "normal" }] },
  );
}
