"use client";

import { useEffect, useState } from "react";

export default function MindIntentionPage() {
  const [submitting, setSubmitting] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const webApp = (window as any).Telegram?.WebApp;
      setTgUser(webApp?.initDataUnsafe?.user || null);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <p className="text-fuchsia-400 tracking-[0.4em] text-sm">MAWER ORACLE</p>
          <h1 className="text-4xl font-bold leading-tight">Держи намерение в голове</h1>
          <p className="text-zinc-400">Закрой глаза. Сконцентрируйся на вопросе.</p>
        </div>

        <form
          action="/api/create-reading"
          method="GET"
          onSubmit={() => setSubmitting(true)}
        >
          <input type="hidden" name="method" value="mind" />
          <input type="hidden" name="telegram_id" value={tgUser?.id ? String(tgUser.id) : ""} />
          <input type="hidden" name="username" value={tgUser?.username || ""} />
          <input type="hidden" name="first_name" value={tgUser?.first_name || ""} />
          <input type="hidden" name="last_name" value={tgUser?.last_name || ""} />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg disabled:opacity-50"
          >
            {submitting ? "Открываю карту..." : "Получить карту"}
          </button>
        </form>
      </div>
    </main>
  );
}