import sharp from "sharp";
import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function textSvg(text: string, size: number, color: string, weight = 400) {
  return Buffer.from(`
    <svg width="900" height="140" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: sans-serif; font-weight: ${weight}; }
      </style>
      <text x="0" y="${size + 10}" fill="${color}" font-size="${size}">
        ${esc(text)}
      </text>
    </svg>
  `);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const card = searchParams.get("card") || "Карта";
  const original = searchParams.get("original") || "";
  const meaning = searchParams.get("meaning") || "";
  const rarity = searchParams.get("rarity") || "";
  const track = searchParams.get("track") || "";

  const cardImagePath = path.join(process.cwd(), "public", "cards", "fool.png");

  const cardImage = await readFile(cardImagePath);

  const resizedCard = await sharp(cardImage)
    .resize(500, 760, { fit: "contain" })
    .png()
    .toBuffer();

  const bg = await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: "#000000",
    },
  })
    .png()
    .toBuffer();

  const infoBox = Buffer.from(`
    <svg width="920" height="420" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="920" height="420" rx="48" fill="#111" stroke="#4a154f"/>
      <line x1="50" y1="315" x2="870" y2="315" stroke="#222"/>
    </svg>
  `);

  const meaningSvg = Buffer.from(`
    <svg width="820" height="170" xmlns="http://www.w3.org/2000/svg">
      <foreignObject x="0" y="0" width="820" height="170">
        <div xmlns="http://www.w3.org/1999/xhtml"
          style="color:white;font-size:38px;line-height:1.32;font-family:sans-serif;">
          ${esc(meaning)}
        </div>
      </foreignObject>
    </svg>
  `);

  const image = await sharp(bg)
    .composite([
      { input: textSvg("MAWER ORACLE", 28, "#d946ef", 700), top: 80, left: 80 },
      { input: textSvg(card, 76, "#ffffff", 700), top: 150, left: 80 },
      { input: textSvg(original, 34, "#888888"), top: 245, left: 80 },

      { input: resizedCard, top: 420, left: 290 },

      { input: infoBox, top: 1320, left: 80 },
      { input: textSvg(rarity, 28, "#d946ef", 700), top: 1360, left: 130 },
      { input: meaningSvg, top: 1440, left: 130 },
      { input: textSvg("ТРЕК ДНЯ", 24, "#666666"), top: 1650, left: 130 },
      { input: textSvg(track, 28, "#ffffff"), top: 1695, left: 130 },
    ])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}