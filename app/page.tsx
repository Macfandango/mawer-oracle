"use client";

import { useState } from "react";

const cards = [
  {
    card: "THE MOON",
    rarity: "EPIC",
    meaning:
      "Сегодня день интуиции, скрытых знаков и внутренних ответов. Не пытайся всё контролировать.",
    track: "Lana Del Rey — West Coast",
    artwork:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
  },
  {
    card: "THE STAR",
    rarity: "RARE",
    meaning:
      "Сегодня тебе важно вернуться к вере в себя. День мягкости, надежды и красоты.",
    track: "Cigarettes After Sex — Apocalypse",
    artwork:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
  },
  {
    card: "THE LOVERS",
    rarity: "LEGENDARY",
    meaning:
      "Сегодня день эмоциональной химии и неожиданных чувств.",
    track: "Arctic Monkeys — I Wanna Be Yours",
    artwork:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200",
  },
];

export default function Home() {
  const [opened, setOpened] = useState(false);

  const randomCard =
    cards[Math.floor(Math.random() * cards.length)];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full">
        {!opened ? (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <p className="text-purple-400 tracking-[0.4em] text-sm">
                MAWER ORACLE
              </p>

              <h1 className="text-5xl font-bold leading-tight">
                Твоя карта,
                <br />
                трек и картина дня
              </h1>

              <p className="text-zinc-400">
                Открой сегодняшний вайб.
              </p>
            </div>

            <button
              onClick={() => setOpened(true)}
              className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg active:scale-95 transition"
            >
              Открыть предсказание
            </button>
          </div>
        ) : (
          <div className="rounded-[32px] overflow-hidden bg-zinc-950 border border-zinc-800">
            <img
              src={randomCard.artwork}
              className="w-full h-80 object-cover"
            />

            <div className="p-6 space-y-5">
              <div className="flex justify-between">
                <p className="text-purple-400 text-xs tracking-[0.3em]">
                  {randomCard.rarity}
                </p>

                <p className="text-zinc-500 text-xs">
                  CARD OF THE DAY
                </p>
              </div>

              <h2 className="text-4xl font-bold">
                {randomCard.card}
              </h2>

              <p className="text-zinc-300 leading-relaxed">
                {randomCard.meaning}
              </p>

              <div className="bg-zinc-900 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs mb-1">
                  TRACK OF THE DAY
                </p>

                <p className="text-lg">
                  {randomCard.track}
                </p>
              </div>

              <button
                className="w-full bg-white text-black py-4 rounded-2xl font-bold"
                onClick={() => {
                  navigator.share?.({
                    title: "Mawer Oracle",
                    text: `${randomCard.card} — ${randomCard.meaning}`,
                  });
                }}
              >
                Поделиться вайбом
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}