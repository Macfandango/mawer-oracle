"use client";

export default function ShareCardButton({
  readingId,
}: {
  readingId: string;
}) {
  const handleShare = () => {
    const url = `${window.location.origin}/api/share-card?readingId=${readingId}`;
    window.open(url, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-bold text-center select-none"
    >
      Сохранить свою карту
    </button>
  );
}