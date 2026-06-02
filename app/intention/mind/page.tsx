"use client";

import { useEffect, useState } from "react";

export default function MindIntentionPage() {
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  const [requestId, setRequestId] = useState("");
  const [anonymousId, setAnonymousId] = useState("");
  const [localDayKey, setLocalDayKey] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState("");

  useEffect(() => {
alert("STEP 1");
    const id = Math.random().toString(36).slice(2) + Date.now();

alert("STEP 2");

    let storedAnonymousId = "";

    try {
      storedAnonymousId = localStorage.getItem("mawer_anonymous_id") || "";

      if (!storedAnonymousId) {
        storedAnonymousId =
          "fallback-" + Math.random().toString(36).slice(2) + Date.now();

        localStorage.setItem("mawer_anonymous_id", storedAnonymousId);
      }
alert("STEP 3" + storedAnonymousId);
    } catch {
      storedAnonymousId =
        "fallback-" + Math.random().toString(36).slice(2) + Date.now();
    }

    const now = new Date();
    const dailyBoundary = new Date(now);

    dailyBoundary.setHours(6, 0, 0, 0);

    if (now < dailyBoundary) {
      dailyBoundary.setDate(dailyBoundary.getDate() - 1);
    }

    const year = dailyBoundary.getFullYear();
    const month = String(dailyBoundary.getMonth() + 1).padStart(2, "0");
const day = String(dailyBoundary.getDate()).padStart(2, "0");

alert("STEP 4 " + year + "-" + month + "-" + day);

    setRequestId(id);
    setAnonymousId(storedAnonymousId);
    setLocalDayKey(`${year}-${month}-${day}`);
    setTimezoneOffset(String(now.getTimezoneOffset()));

alert("STEP 5");

    setReady(true);

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
      setValue("debug_init_data", webApp?.initData || "");
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
          onSubmit={() => {
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

          <p className="text-red-500 break-all text-xs">
            id:{anonymousId}
            <br />
            day:{localDayKey}
          </p>

          <button
            id="draw-card-btn-mind"
            type="submit"
            disabled={!ready || submitting}
            className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg disabled:opacity-50"
          >
            {submitting
              ? "Открываю карту..."
              : ready
              ? "Получить карту"
              : "Готовлю карту..."}
          </button>
        </form>
      </div>
    </main>
  );
}