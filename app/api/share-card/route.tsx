import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const card = searchParams.get("card") || "Карта";
  const original = searchParams.get("original") || "";
  const meaning = searchParams.get("meaning") || "";
  const rarity = searchParams.get("rarity") || "";
  const track = searchParams.get("track") || "";

  const artworkParam = searchParams.get("artwork") || "";
  const origin = new URL(request.url).origin;

  const artwork = artworkParam.startsWith("/")
    ? `${origin}${artworkParam}`
    : artworkParam;

let artworkBase64 = "";

if (artwork) {
  const imageRes = await fetch(artwork);
  const imageBuffer = await imageRes.arrayBuffer();

  const bytes = new Uint8Array(imageBuffer);
  let binary = "";

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  artworkBase64 = `data:image/jpeg;base64,${btoa(binary)}`;
}

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

{artworkBase64 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "860px",
    }}
  >
    <img
      src={artworkBase64}
      width="500"
      height="760"
      style={{
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
)}

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