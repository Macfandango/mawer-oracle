"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id?: number;
            username?: string;
            first_name?: string;
            last_name?: string;
          };
        };
      };
    };
  }
}

export default function LoadingReading() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      const params = new URLSearchParams(window.location.search);

      const existingReadingId = params.get("readingId");
      const method = params.get("method");
      const intention = params.get("intention");
      const shuffle = Math.random().toString(36).slice(2);

      if (existingReadingId) {
        window.location.href = `/reading/result?readingId=${existingReadingId}&shuffle=${shuffle}`;
        return;
      }

      const readingId = crypto.randomUUID();
      const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

      const { error } = await supabase.from("intentions").insert([
        {
          reading_id: readingId,
          telegram_id: tgUser?.id ? String(tgUser.id) : null,
          username: tgUser?.username || null,
          first_name: tgUser?.first_name || null,
          last_name: tgUser?.last_name || null,
          method: method || "unknown",
          intention_text: method === "write" ? intention : null,
          card_name: null,
        },
      ]);

      console.log("LOADING INSERT ERROR:", error);

      if (!error) {
        setTimeout(() => {
          window.location.href = `/reading/result?readingId=${readingId}&shuffle=${shuffle}`;
        }, 1800);
      }
    };

    run();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center text-center space-y-6 animate-pulse">
        <div className="w-32 h-32 rounded-full border-4 border-fuchsia-500 border-t-transparent animate-spin" />

        <div className="space-y-2">
          <p className="text-fuchsia-400 tracking-[0.4em] text-sm">
            MAWER ORACLE
          </p>

          <h2 className="text-3xl font-bold">Читаю твою энергию...</h2>

          <p className="text-zinc-500">
            Вселенная готовит для тебя твою карту
          </p>
        </div>
      </div>
    </main>
  );
}