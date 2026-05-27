"use client";

import { useState } from "react";
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

export default function MindIntentionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const saveIntention = async () => {
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
        method: "mind",
        intention_text: null,
        card_name: null,
      },
    ]);

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
            Держи намерение в голове
          </h1>

          <p className="text-zinc-400">
            Закрой глаза. Сконцентрируйся на вопросе.
          </p>
        </div>

        <button
          onClick={saveIntention}
          disabled={loading}
          className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg"
        >
          {loading ? "..." : "Получить карту"}
        </button>

      </div>
    </main>
  );
}