"use client";

export default function WriteIntentionPage() {
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

        <form action="/api/create-reading" method="GET" className="space-y-4">
          <input type="hidden" name="method" value="write" />

          <textarea
            name="intention"
            placeholder="Например: что мне важно понять прямо сейчас?"
            className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 outline-none resize-none"
          />

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