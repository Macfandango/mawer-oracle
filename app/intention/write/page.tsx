"use client";

import { useState } from "react";
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

export default function WriteIntentionPage() {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (loading) return;
    setLoading(true);

    const readingId = crypto.randomUUID();
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    const { error } = await supabase.from("intentions").insert([
      {
        telegram_id: tgUser?.id ? String(tgUser.id) : null,
        username: tgUser?.username || null,
        first_name: tgUser?.first_name || null,
        last_name: tgUser?.last_name || null,
        reading_id: readingId,
        method: "write",
        intention_text: text,
        card_name: null,
      },
    ]);

    setLoading(false);

    if (!error) {
      window.location.href = `/reading/loading?readingId=${readingId}`;
    }
  };

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

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: что мне важно понять прямо сейчас?"
          className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 outline-none resize-none"
        />

      <form onSubmit={handleSubmit}>
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg text-center cursor-pointer active:scale-[0.98]"
  >
    {loading ? "..." : "Получить карту"}
  </button>
</form>

      </div>
    </main>
  );
}