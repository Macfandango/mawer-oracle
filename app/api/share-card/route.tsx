import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const card = searchParams.get("card") || "Карта";
  const original = searchParams.get("original") || "";
  const meaning = searchParams.get("meaning") || "";
  const rarity = searchParams.get("rarity") || "";
  const track = searchParams.get("track") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#d946ef",
              letterSpacing: "12px",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            MAWER ORACLE
          </div>

          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {card}
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#888",
            }}
          >
            {original}
          </div>
        </div>

        <div
          style={{
            border: "1px solid rgba(217,70,239,0.35)",
            borderRadius: 48,
            padding: 48,
            display: "flex",
            flexDirection: "column",
            gap: 36,
            background: "#111",
          }}
        >
          <div
            style={{
              color: "#d946ef",
              fontSize: 28,
              letterSpacing: "8px",
              fontWeight: 700,
            }}
          >
            {rarity}
          </div>

          <div
            style={{
              fontSize: 44,
              lineHeight: 1.45,
            }}
          >
            {meaning}
          </div>

          <div
            style={{
              borderTop: "1px solid #222",
              paddingTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                color: "#666",
                fontSize: 24,
              }}
            >
              ТРЕК ДНЯ
            </div>

            <div
              style={{
                fontSize: 30,
              }}
            >
              {track}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}