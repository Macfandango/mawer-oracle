"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function IntentionPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"mind" | "write" | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const saveIntention = async () => {
    setLoading(true);

    await supabase.from("intentions").insert([
      {
        method: mode,
        intention_text: mode === "write" ? text : null,
      },
    ]);

    router.push("/reading/loading");
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

        <div className="space-y-4">

          <button
            onClick={() => setMode("mind")}
            className={`w-full rounded-3xl border p-5 text-left transition ${
              mode === "mind"
                ? "border-fuchsia-500 bg-fuchsia-500/10"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <p className="font-bold text-lg">
              ✨ Держу намерение в голове
            </p>

            <p className="text-zinc-500 text-sm mt-2">
              Просто почувствуй свой вопрос внутри себя.
            </p>
          </button>

          <button
            onClick={() => setMode("write")}
            className={`w-full rounded-3xl border p-5 text-left transition ${
              mode === "write"
                ? "border-fuchsia-500 bg-fuchsia-500/10"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <p className="font-bold text-lg">
              🖋 Хочу записать намерение
            </p>

            <p className="text-zinc-500 text-sm mt-2">
              Запиши свой вопрос или состояние.
            </p>
          </button>

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