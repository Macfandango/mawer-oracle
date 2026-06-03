import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getLocalDayKey() {
  const now = new Date();
  const dailyBoundary = new Date(now);

  dailyBoundary.setHours(6, 0, 0, 0);

  if (now < dailyBoundary) {
    dailyBoundary.setDate(dailyBoundary.getDate() - 1);
  }

  const year = dailyBoundary.getFullYear();
  const month = String(dailyBoundary.getMonth() + 1).padStart(2, "0");
  const day = String(dailyBoundary.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const method = searchParams.get("method") || "unknown";
  const intention = searchParams.get("intention");

  const telegram_id = searchParams.get("telegram_id");
  const username = searchParams.get("username");
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");

  const anonymous_id = searchParams.get("anonymous_id");
  const local_day_key = searchParams.get("local_day_key") || getLocalDayKey();
  const local_timezone_offset = searchParams.get("timezone_offset");

  const cookieHeader = request.headers.get("cookie") || "";
  const existingDeviceId = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("mawer_device_id="))
    ?.split("=")[1];

  const device_id = existingDeviceId || crypto.randomUUID();

  const redirectWithCookie = (url: URL) => {
    const response = NextResponse.redirect(url);

    response.cookies.set("mawer_device_id", device_id, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    return response;
  };

  const readingId = crypto.randomUUID();

  await supabase.from("intentions").insert([
    {
      device_id,
      anonymous_id,
      local_day_key,
      local_timezone_offset,
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

  return redirectWithCookie(
    new URL(`/reading/loading?readingId=${readingId}`, request.url)
  );
}