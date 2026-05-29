import sharp from "sharp";
import path from "path";
import { readFile } from "fs/promises";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const baseUrl = new URL(request.url);
  const { searchParams } = baseUrl;

  const readingId = searchParams.get("readingId");

  let card = searchParams.get("card") || "Карта";
  let original = searchParams.get("original") || "";
  let meaning = searchParams.get("meaning") || "";
  let rarity = searchParams.get("rarity") || "";
  let artwork = searchParams.get("artwork") || "/cards/fool.png";
  let track = searchParams.get("track") || "MAWER Oracle — Track of the Day";

  if (readingId) {
    const { data } = await supabase
      .from("intentions")
      .select(
        "card_name, card_original, card_meaning, card_rarity, card_artwork, track_title"
      )
      .eq("reading_id", readingId)
      .maybeSingle();

    if (data) {
      card = data.card_name || card;
      original = data.card_original || original;
      meaning = data.card_meaning || meaning;
      rarity = data.card_rarity || rarity;
      artwork = data.card_artwork || artwork;
      track = data.track_title || track;
    }
  }

  const baseImageParams = new URLSearchParams({
    card,
    original,
    meaning,
    rarity,
    track,
  });

  const baseImageUrl = new URL(
    `/api/share-card-base?${baseImageParams.toString()}`,
    baseUrl.origin
  );

  const baseResponse = await fetch(baseImageUrl);
  const baseImage = Buffer.from(await baseResponse.arrayBuffer());

  const safeArtwork = artwork.replace(/^\/+/, "");
  const cardImagePath = path.join(process.cwd(), "public", safeArtwork);
  const cardImage = await readFile(cardImagePath);

  const resizedCard = await sharp(cardImage)
    .resize(500, 760, { fit: "contain" })
    .png()
    .toBuffer();

  const finalImage = await sharp(baseImage)
    .composite([
      { input: resizedCard, top: 420, left: 290 },
    ])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(finalImage), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}