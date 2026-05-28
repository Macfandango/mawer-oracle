"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

type SaveCardButtonProps = {
  card: string;
  original: string;
  rarity: string;
  rarityColor: string;
  meaning: string;
  artwork: string;
  trackTitle: string;
};

export default function SaveCardButton({
  card,
  original,
  rarity,
  rarityColor,
  meaning,
  artwork,
  trackTitle,
}: SaveCardButtonProps) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const saveImage = async () => {
    if (!shareRef.current || loading) return;

    setLoading(true);

    const dataUrl = await toPng(shareRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#000000",
    });

    const link = document.createElement("a");
    link.download = `mawer-oracle-${card}.png`;
    link.href = dataUrl;
    link.click();

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={saveImage}
        className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-bold text-center"
      >
        {loading ? "Сохраняю..." : "Сохранить свою карту"}
      </button>

      <div className="fixed -left-[9999px] top-0">
        <div
          ref={shareRef}
          style={{ width: 1080, height: 1920 }}
          className="bg-black text-white flex flex-col justify-between p-20"
        >
          <div className="text-center space-y-8">
            <p className="text-fuchsia-400 tracking-[0.6em] text-3xl font-bold">
              MAWER ORACLE
            </p>

            <h1 className="text-7xl font-bold leading-tight">{card}</h1>
            <p className="text-zinc-400 text-3xl">{original}</p>
          </div>

          <div className="flex justify-center">
            <img
              src={artwork}
              alt={card}
              className="max-h-[900px] object-contain rounded-3xl"
            />
          </div>

          <div className="space-y-8">
            <p className={`${rarityColor} text-3xl tracking-[0.4em] font-bold`}>
              {rarity}
            </p>

            <p className="text-4xl leading-relaxed">{meaning}</p>

            <div className="border border-zinc-800 rounded-3xl p-8">
              <p className="text-zinc-500 text-2xl mb-3">ТРЕК ДНЯ</p>
              <p className="text-3xl">{trackTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}