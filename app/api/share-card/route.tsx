import sharp from "sharp";
import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function textLayer(
  text: string,
  width: number,
  height: number,
  size: number,
  color: string,
  fontfile: string
) {
  return sharp({
    text: {
      text: `<span foreground="${color}" font_desc="Noto Sans ${size}">${esc(text)}</span>`,
      width,
      height,
      rgba: true,
      fontfile,
    },
  })
    .png()
    .toBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const card = searchParams.get("card") || "Карта";
  const original = searchParams.get("original") || "";
  const meaning = searchParams.get("meaning") || "";
  const rarity = searchParams.get("rarity") || "";
const regularFontPath = path.join(
  process.cwd(),
  "public",
  "fonts",
  "NotoSans-Regular.ttf"
);

const boldFontPath = path.join(
  process.cwd(),
  "public",
  "fonts",
  "NotoSans-Bold.ttf"
);
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

  const image = await sharp(bg)
    .composite([
  {
    input: await textLayer(
      "MAWER ORACLE",
      900,
      80,
      28,
      "#d946ef",
      boldFontPath
    ),
    top: 80,
    left: 80,
  },

  {
    input: await textLayer(
      card,
      900,
      120,
      76,
      "#ffffff",
      boldFontPath
    ),
    top: 150,
    left: 80,
  },

  {
    input: await textLayer(
      original,
      900,
      60,
      34,
      "#888888",
      regularFontPath
    ),
    top: 245,
    left: 80,
  },

  { input: resizedCard, top: 420, left: 290 },

  { input: infoBox, top: 1320, left: 80 },

  {
    input: await textLayer(
      rarity,
      820,
      60,
      28,
      "#d946ef",
      boldFontPath
    ),
    top: 1360,
    left: 130,
  },

  {
    input: await textLayer(
      meaning,
      820,
      180,
      38,
      "#ffffff",
      regularFontPath
    ),
    top: 1440,
    left: 130,
  },

  {
    input: await textLayer(
      "ТРЕК ДНЯ",
      300,
      40,
      24,
      "#666666",
      regularFontPath
    ),
    top: 1650,
    left: 130,
  },

  {
    input: await textLayer(
      track,
      820,
      50,
      28,
      "#ffffff",
      regularFontPath
    ),
    top: 1695,
    left: 130,
  },
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