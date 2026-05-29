"use client";

import { useEffect, useState } from "react";

export default function WriteIntentionPage() {
	const [submitting, setSubmitting] = useState(false);
const [requestId] = useState(() => crypto.randomUUID());
const [anonymousId, setAnonymousId] = useState("");
const [localDayKey, setLocalDayKey] = useState("");
const [timezoneOffset, setTimezoneOffset] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
let storedAnonymousId = localStorage.getItem("mawer_anonymous_id");

if (!storedAnonymousId) {
  storedAnonymousId = crypto.randomUUID();
  localStorage.setItem("mawer_anonymous_id", storedAnonymousId);
}

const now = new Date();
const dailyBoundary = new Date(now);

dailyBoundary.setHours(6, 0, 0, 0);

if (now < dailyBoundary) {
  dailyBoundary.setDate(dailyBoundary.getDate() - 1);
}

const dayKey = dailyBoundary.toISOString().slice(0, 10);

setAnonymousId(storedAnonymousId);
setLocalDayKey(dayKey);
setTimezoneOffset(String(now.getTimezoneOffset()));
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
            Запиши намерение
          </h1>

          <p className="text-zinc-400">
            Что тебя сейчас волнует?
          </p>
        </div>

        <form
  action="/api/create-reading"
  method="GET"
  onSubmit={() => {
    setSubmitting(true);

    const btn = document.getElementById(
      "draw-card-btn-write"
    ) as HTMLButtonElement;

    if (btn) {
      btn.disabled = true;
      btn.innerText = "Открываю карту...";
      btn.style.opacity = "0.5";
    }
  }}
>
  <input type="hidden" name="method" value="write" />
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

  <p className="text-red-500">
    {anonymousId} | {localDayKey}
  </p>

  <textarea
    name="intention"
    placeholder="Например: что мне важно понять прямо сейчас?"
    className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 outline-none resize-none"
  />

<p className="text-red-500">
  {anonymousId} | {localDayKey}
</p>

  <button
    id="draw-card-btn-write"
    type="submit"
    className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg"
  >
    Получить карту
  </button>
</form>