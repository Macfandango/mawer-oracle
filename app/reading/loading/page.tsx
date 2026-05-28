export const dynamic = "force-dynamic";

export default async function LoadingReading({
  searchParams,
}: {
  searchParams: Promise<{ readingId?: string }>;
}) {
  const params = await searchParams;
  const readingId = params.readingId || "";
  const shuffle = Math.random().toString(36).slice(2);

  return (
    <>
      <meta
        httpEquiv="refresh"
        content={`2;url=/reading/result?readingId=${encodeURIComponent(
          readingId
        )}&shuffle=${shuffle}`}
      />

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
    </>
  );
}