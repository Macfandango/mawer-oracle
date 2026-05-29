"use client";

export default function ShareCardButton({
  readingId,
}: {
  readingId: string;
}) {
  const url = `/api/share-card?readingId=${encodeURIComponent(readingId)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-bold text-center select-none"
    >
      Сохранить свою карту
    </a>
  );
}