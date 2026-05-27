export default function MindIntentionPage() {
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

        <form action="/api/create-reading" method="GET">
  <input type="hidden" name="method" value="mind" />

  <button
    type="submit"
    className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg text-center cursor-pointer active:scale-[0.98]"
  >
    Получить карту
  </button>
</form>
      </div>
    </main>
  );
}