"use client";

import { useEffect, useState } from "react";

export default function MindIntentionPage() {
  const [submitting, setSubmitting] = useState(false);

const [requestId] = useState(
  () => Math.random().toString(36).slice(2) + Date.now()
);

const [anonymousId] = useState(() => {
  try {
    if (typeof window === "undefined") return "";

    const storage = window.localStorage;

    let id = storage.getItem("mawer_anonymous_id");

    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now();
      storage.setItem("mawer_anonymous_id", id);
    }

    return id;
  } catch (e) {
    return "fallback-" + Math.random().toString(36).slice(2) + Date.now();
  }
});

const [localDayKey] = useState(() => {
  if (typeof window === "undefined") return "";

  const now = new Date();
  const dailyBoundary = new Date(now);

  dailyBoundary.setHours(6, 0, 0, 0);

  if (now < dailyBoundary) {
    dailyBoundary.setDate(dailyBoundary.getDate() - 1);
  }

  return dailyBoundary.toISOString().slice(0, 10);
});

const [timezoneOffset] = useState(() => {
  if (typeof window === "undefined") return "";
  return String(new Date().getTimezoneOffset());
});

useEffect(() => {
  const timer = setTimeout(() => {
    const webApp = (window as any).Telegram?.WebApp;
    const user = webApp?.initDataUnsafe?.user;

    const setValue = (id: string, value: string) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (input) input.value = value || "";
    };

    setValue("telegram_id", user?.id ? String(user.id) : "");
    setValue("username", user?.username || "");
    setValue("first_name", user?.first_name || "");
    setValue("last_name", user?.last_name || "");
    setValue("debug_tg_user", user ? JSON.stringify(user) : "");
    setValue("debug_init_data", (webApp as any)?.initData || "");
  }, 500);

  return () => clearTimeout(timer);
}, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <p className="text-fuchsia-400 tracking-[0.4em] text-sm">
            MAWER ORACLE
          </p>

          <h1 className="text-4xl font-bold leading-tight">
            Держи намерение в голове
          </h1>

          <p className="text-zinc-400">
            Закрой глаза. Сконцентрируйся на вопросе.
          </p>
        </div>

<form
  action="/api/create-reading"
  method="GET"
onSubmit={(e) => {

  setSubmitting(true);

  const btn = document.getElementById(
    "draw-card-btn-mind"
  ) as HTMLButtonElement;

  if (btn) {
    btn.disabled = true;
    btn.innerText = "Открываю карту...";
    btn.style.opacity = "0.5";
  }
}}
>

<input type="hidden" name="method" value="mind" />
<input type="hidden" name="request_id" value={requestId} />

          <input id="telegram_id" type="hidden" name="telegram_id" />
          <input id="username" type="hidden" name="username" />
          <input id="first_name" type="hidden" name="first_name" />
          <input id="last_name" type="hidden" name="last_name" />
          <input id="debug_tg_user" type="hidden" name="debug_tg_user" />
          <input id="debug_init_data" type="hidden" name="debug_init_data" />
<input type="hidden" name="anonymous_id" value={anonymousId} />
<input type="hidden" name="local_day_key" value={localDayKey} />
<input type="hidden" name="timezone_offset" value={timezoneOffset} />

<p className="text-red-500 break-all">
  window:{typeof window}
  <br />
  ls:{
    typeof window !== "undefined" &&
    "localStorage" in window
      ? "exists"
      : "missing"
  }
  <br />
  id:{anonymousId}
  <br />
  day:{localDayKey}
</p>

<button
  id="draw-card-btn-mind"
  type="submit"
  className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg"
>
  Получить карту
</button>
        </form>
      </div>
    </main>
  );
}