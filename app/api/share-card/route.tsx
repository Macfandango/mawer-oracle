import sharp from "sharp";
import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

function esc(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const card = esc(searchParams.get("card") || "Карта");
  const original = esc(searchParams.get("original") || "");
  const meaning = esc(searchParams.get("meaning") || "");
  const rarity = esc(searchParams.get("rarity") || "");
  const track = esc(searchParams.get("track") || "");

  const cardImagePath = path.join(process.cwd(), "public", "cards", "fool.png");
  const cardImage = await readFile(cardImagePath);

  const resizedCard = await sharp(cardImage)
    .resize(500, 760, { fit: "contain" })
    .png()
    .toBuffer();

  const svg = `
  <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1920" fill="#000"/>

    <text x="80" y="120" fill="#d946ef" font-size="28" font-family="Arial" font-weight="700" letter-spacing="12">
      MAWER ORACLE
    </text>

    <text x="80" y="210" fill="#fff" font-size="76" font-family="Arial" font-weight="700">
      ${card}
    </text>

    <text x="80" y="270" fill="#888" font-size="34" font-family="Arial">
      ${original}
    </text>

    <rect x="80" y="1320" width="920" height="420" rx="48" fill="#111" stroke="#4a154f"/>

    <text x="130" y="1395" fill="#d946ef" font-size="28" font-family="Arial" font-weight="700" letter-spacing="8">
      ${rarity}
    </text>

    <foreignObject x="130" y="1440" width="820" height="160">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:white;font-size:40px;line-height:1.35;font-family:Arial;">
        ${meaning}
      </div>
    </foreignObject>

    <line x1="130" y1="1635" x2="950" y2="1635" stroke="#222"/>

    <text x="130" y="1685" fill="#666" font-size="24" font-family="Arial">
      ТРЕК ДНЯ
    </text>

    <text x="130" y="1730" fill="#fff" font-size="28" font-family="Arial">
      ${track}
    </text>
  </svg>`;

  const image = await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: "#000000",
    },
  })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: resizedCard, top: 420, left: 290 },
    ])
    .png()
    .toBuffer();

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}