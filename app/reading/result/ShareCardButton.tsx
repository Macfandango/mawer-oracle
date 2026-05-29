"use client";

export default function ShareCardButton({
  readingId,
}: {
  readingId: string;
}) {
  const handleShare = async () => {
  const url = `${window.location.origin}/api/share-card?readingId=${readingId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "MAWER Oracle",
        text: "Моя карта дня",
        url,
      });
    } else {
      window.open(url, "_blank");
    }
  } catch (e) {
    console.log(e);
  }
};

  return (
    <button
      onClick={handleShare}
      className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-bold"
    >
      Сохранить свою карту
    </button>
  );
}