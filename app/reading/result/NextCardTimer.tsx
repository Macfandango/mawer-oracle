"use client";

import { useEffect, useState } from "react";

function getNextSixAM() {
  const now = new Date();
  const next = new Date(now);

  next.setHours(6, 0, 0, 0);

  if (now >= next) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}ч ${minutes}м ${seconds}с`;
}

export default function NextCardTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const next = getNextSixAM();
      setTimeLeft(formatTime(next.getTime() - now.getTime()));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 text-center">
      <p className="text-xs text-zinc-500 mb-2">СЛЕДУЮЩАЯ КАРТА</p>
      <p className="text-zinc-300 text-sm">Откроется завтра в 06:00</p>
      <p className="text-2xl font-bold text-fuchsia-400 mt-2">{timeLeft}</p>
    </div>
  );
}