"use client";

import { useState } from "react";

const cards = [
  {
    card: "THE MOON",
    rarity: "EPIC",
    rarityColor: "text-fuchsia-400",
    chance: "2.1%",
    meaning:
      "Сегодня день интуиции, скрытых знаков и внутренних ответов. Не пытайся всё контролировать.",
    track: "Lana Del Rey — West Coast",
    artwork:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
  },
  {
    card: "THE STAR",
    rarity: "RARE",
    rarityColor: "text-cyan-400",
    chance: "7%",
    meaning:
      "Сегодня тебе важно вернуться к вере в себя. День мягкости, надежды и красоты.",
    track: "Cigarettes After Sex — Apocalypse",
    artwork:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
  },
  {
    card: "THE LOVERS",
    rarity: "LEGENDARY",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    meaning: "Сегодня день эмоциональной химии и неожиданных чувств.",
    track: "Arctic Monkeys — I Wanna Be Yours",
    artwork:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200",
  },
  {
    card: "THE DEVIL",
    rarity: "FORBIDDEN",
    rarityColor: "text-red-500",
    chance: "0.2%",
    meaning: "Что-то сегодня будет слишком притягательным, чтобы это игнорировать.",
    track: "Massive Attack — Angel",
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200",
  },
];

type Card = (typeof cards)[number];

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);

  function openReading() {
    setLoading(true);

    window.setTimeout(() => {
      const card = cards[Math.floor(Math.random() * cards.length)];
      setSelectedCard(card);
      setLoading(false);
    }, 1600);
  }

  function shareReading() {
    if (!selectedCard) return;

    const text = `${selectedCard.card} — ${selectedCard.meaning}`;

    if (navigator.share) {
      navigator.share({
        title: "Mawer Oracle",
        text,
        url: "https://mawer-oracle.vercel.app",
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Reading copied");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center text-center space-y-6 animate-pulse">
          <div className="w-32 h-32 rounded-full border-4 border-fuchsia-500 border-t-transparent animate-spin" />

          <div className="space-y-2">
            <p className="text-fuchsia-400 tracking-[0.4em] text-sm">
              MAWER ORACLE
            </p>

            <h2 className="text-3xl font-bold">Reading your energy...</h2>

            <p className="text-zinc-500">The cards are aligning</p>
          </div>
        </div>
      </main>
    );
  }

  if (!selectedCard) {
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
              трек и картина дня
            </h1>

            <p className="text-zinc-400">Открой сегодняшний вайб.</p>
          </div>

          <button
  type="button"
  onTouchStart={openReading}
  onClick={openReading}
  className="w-full bg-white text-black py-5 rounded-3xl font-bold text-lg active:scale-95 transition min-h-[72px] touch-manipulation select-none"
  style={{ WebkitTapHighlightColor: "transparent" }}
>
            Открыть предсказание
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full rounded-[32px] overflow-hidden bg-zinc-950 border border-zinc-800">
        <img
          src={selectedCard.artwork}
          alt={selectedCard.card}
          className="w-full h-80 object-cover"
        />

        <div className="p-6 space-y-5">
          <div className="flex justify-between">
            <p className={`${selectedCard.rarityColor} text-xs tracking-[0.3em] font-bold`}>
              {selectedCard.rarity}
            </p>

            <p className="text-zinc-500 text-xs">CARD OF THE DAY</p>
          </div>

          <h2 className="text-4xl font-bold">{selectedCard.card}</h2>

          <p className="text-zinc-300 leading-relaxed">
            {selectedCard.meaning}
          </p>

          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">RARITY</p>

            <p className={`text-lg font-bold ${selectedCard.rarityColor}`}>
              {selectedCard.rarity}
            </p>

            <p className="text-zinc-400 text-sm mt-2">
              Only {selectedCard.chance} of users got this card today.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs mb-1">TRACK OF THE DAY</p>
            <p className="text-lg">{selectedCard.track}</p>
          </div>

          <button
            type="button"
            className="w-full bg-white text-black py-4 rounded-2xl font-bold"
            onClick={shareReading}
          >
            Поделиться вайбом
          </button>
        </div>
      </div>
    </main>
  );
}