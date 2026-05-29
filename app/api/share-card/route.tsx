import sharp from "sharp";
import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const baseUrl = new URL(request.url);

  const baseImageUrl = new URL("/api/share-card-base" + baseUrl.search, baseUrl.origin);
  const baseResponse = await fetch(baseImageUrl);
  const baseImage = Buffer.from(await baseResponse.arrayBuffer());

  const { searchParams } = new URL(request.url);
const artwork = searchParams.get("artwork") || "/cards/fool.png";

const safeArtwork = artwork.replace(/^\/+/, "");
const cardImagePath = path.join(process.cwd(), "public", safeArtwork);
  const cardImage = await readFile(cardImagePath);

  const resizedCard = await sharp(cardImage)
    .resize(500, 760, { fit: "contain" })
    .png()
    .toBuffer();

  const finalImage = await sharp(baseImage)
    .composite([{ input: resizedCard, top: 420, left: 290 }])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(finalImage), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}