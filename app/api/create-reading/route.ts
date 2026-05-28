import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const debug_tg_user = searchParams.get("debug_tg_user");
const debug_init_data = searchParams.get("debug_init_data");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const method = searchParams.get("method") || "unknown";
  const intention = searchParams.get("intention");
  const readingId = crypto.randomUUID();
const telegram_id = searchParams.get("telegram_id");
const username = searchParams.get("username");
const first_name = searchParams.get("first_name");
const last_name = searchParams.get("last_name");

  await supabase.from("intentions").insert([
    {
debug_tg_user,
debug_init_data,
telegram_id,
username,
first_name,
last_name,
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