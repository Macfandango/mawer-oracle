"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function IntentionPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"mind" | "write" | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeFromUrl = params.get("mode");

    if (modeFromUrl === "mind" || modeFromUrl === "write") {
      setMode(modeFromUrl);
    }
  }, []);

  const saveIntention = async () => {
    if (!mode) return;

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
        method: mode,
        intention_text: mode === "write" ? text : null,
        card_name: null,
      },
    ]);

    console.log("SUPABASE ERROR:", error);

    setLoading(false);

    if (!error) {
      router.push(`/reading/loading?readingId=${readingId}`);
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
            Сформулируй своё намерение
          </h1>

          <p className="text-zinc-400">
            Закрой глаза. Подумай о вопросе, ситуации или человеке.
          </p>
        </div>

        <div
  onClick={() => {
    window.location.assign("/intention?mode=mind");
  }}
  className={`block w-full rounded-3xl border p-5 text-left transition active:scale-[0.98] cursor-pointer ${
    mode === "mind"
      ? "border-fuchsia-500 bg-fuchsia-500/10"
      : "border-zinc-800 bg-zinc-950"
  }`}
>
  <p className="font-bold text-lg">✨ Держу намерение в голове</p>

  <p className="text-zinc-500 text-sm mt-2">
    Просто почувствуй свой вопрос внутри себя.
  </p>
</div>

        <div
  onClick={() => {
    window.location.assign("/intention?mode=write");
  }}
  className={`block w-full rounded-3xl border p-5 text-left transition active:scale-[0.98] cursor-pointer ${
    mode === "write"
      ? "border-fuchsia-500 bg-fuchsia-500/10"
      : "border-zinc-800 bg-zinc-950"
  }`}
>
  <p className="font-bold text-lg">🖋 Хочу записать намерение</p>

  <p className="text-zinc-500 text-sm mt-2">
    Запиши свой вопрос или состояние.
  </p>
</div>

        {mode === "write" && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Например: что мне важно понять прямо сейчас?"
            className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 outline-none resize-none"
          />
        )}

        {mode && (
          <button
            onClick={saveIntention}
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg"
          >
            {loading ? "..." : "Получить карту"}
          </button>
        )}
      </div>
    </main>
  );
}