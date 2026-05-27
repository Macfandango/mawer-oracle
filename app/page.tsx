export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <p className="text-purple-400 tracking-[0.4em] text-sm">
            MAWER ORACLE
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Твоя карта,
            <br />
            саундтрек и картина дня
          </h1>

          <p className="text-zinc-400">Открой себя сегодня.</p>
        </div>

        <a
          href="/intention"
          className="block w-full bg-white text-black py-5 rounded-3xl font-bold text-lg min-h-[72px] text-center"
        >
          Открыть предсказание
        </a>
      </div>
    </main>
  );
}