"use client";

import { useEffect, useState } from "react";

export default function WriteIntentionPage() {

 useEffect(() => {
  const timer = setTimeout(() => {
    const webApp = window.Telegram?.WebApp;
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
          <p className="text-fuchsia-400 tracking-[0.4em] text-sm">MAWER ORACLE</p>
          <h1 className="text-4xl font-bold leading-tight">Запиши намерение</h1>
          <p className="text-zinc-400">Что тебя сейчас волнует?</p>
        </div>

        <form action="/api/create-reading" method="GET" className="space-y-6">
          <input type="hidden" name="method" value="write" />
          <input type="hidden" name="method" value="mind" />

  <input id="telegram_id" type="hidden" name="telegram_id" />
<input id="username" type="hidden" name="username" />
<input id="first_name" type="hidden" name="first_name" />
<input id="last_name" type="hidden" name="last_name" />
<input id="debug_tg_user" type="hidden" name="debug_tg_user" />
<input id="debug_init_data" type="hidden" name="debug_init_data" />

  <button
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