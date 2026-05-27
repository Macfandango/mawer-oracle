import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const method = searchParams.get("method") || "unknown";
  const intention = searchParams.get("intention");
  const readingId = crypto.randomUUID();

  await supabase.from("intentions").insert([
    {
      reading_id: readingId,
      method,
      intention_text: method === "write" ? intention : null,
      card_name: null,
    },
  ]);

  return NextResponse.redirect(
    new URL(`/reading/loading?readingId=${readingId}`, request.url)
  );
}