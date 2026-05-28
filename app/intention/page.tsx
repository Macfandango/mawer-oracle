export default function IntentionPage() {
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

        <a
          href="/intention/mind"
          className="block w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left"
        >
          <p className="font-bold text-lg">✨ Держу намерение в голове</p>
          <p className="text-zinc-500 text-sm mt-2">
            Просто почувствуй свой вопрос внутри себя.
          </p>
        </a>

        <a
          href="/intention/write"
          className="block w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left"
        >
          <p className="font-bold text-lg">🖋 Хочу записать намерение</p>
          <p className="text-zinc-500 text-sm mt-2">
            Запиши свой вопрос или состояние.
          </p>
        </a>
      </div>
    </main>
  );
}