import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const debug_tg_user = searchParams.get("debug_tg_user");
  const debug_init_data = searchParams.get("debug_init_data");

  const method = searchParams.get("method") || "unknown";
  const intention = searchParams.get("intention");

  const telegram_id = searchParams.get("telegram_id");
  const username = searchParams.get("username");
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
const request_id = searchParams.get("request_id");
const anonymous_id = searchParams.get("anonymous_id");
const local_day_key = searchParams.get("local_day_key");
const local_timezone_offset = searchParams.get("timezone_offset");
const userKey = telegram_id || anonymous_id;

if (request_id) {
  const { data: existingReading } = await supabase
    .from("intentions")
    .select("reading_id")
    .eq("request_id", request_id)
    .limit(1)
    .maybeSingle();

  if (existingReading?.reading_id) {
    return NextResponse.redirect(
      new URL(`/reading/loading?readingId=${existingReading.reading_id}`, request.url)
    );
  }
}

  // защита от множественных кликов: если тот же Telegram user уже создал гадание
  // за последние 10 секунд — не создаём новую строку, а возвращаем его на существующее readingId

if (userKey && local_day_key) {
  const query = supabase
    .from("intentions")
    .select("reading_id")
    .eq("local_day_key", local_day_key)
    .order("created_at", { ascending: false })
    .limit(1);

  if (telegram_id) {
    query.eq("telegram_id", telegram_id);
  } else {
    query.eq("anonymous_id", anonymous_id);
  }

  const { data: todayReading } = await query.maybeSingle();

  if (todayReading?.reading_id) {
    return NextResponse.redirect(
      new URL(`/reading/result?readingId=${todayReading.reading_id}&locked=1`, request.url)
    );
  }
}

  if (telegram_id) {
    const tenSecondsAgo = new Date(Date.now() - 10_000).toISOString();

    const { data: recentReading } = await supabase
      .from("intentions")
      .select("reading_id")
      .eq("telegram_id", telegram_id)
      .eq("method", method)
      .gte("created_at", tenSecondsAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentReading?.reading_id) {
      return NextResponse.redirect(
        new URL(
          `/reading/loading?readingId=${recentReading.reading_id}`,
          request.url
        )
      );
    }
  }

  const readingId = crypto.randomUUID();

  await supabase.from("intentions").insert([
    {
anonymous_id,
local_day_key,
local_timezone_offset,
request_id,
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