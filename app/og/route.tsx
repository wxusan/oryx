import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Digital Product Studio";
  const sub   = searchParams.get("sub")   || "Tashkent · Uzbekistan";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#020202",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top border accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(246,246,247,0.15)", display: "flex" }} />

        {/* Logo text */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.35em", color: "#4f4f55", fontWeight: 400 }}>
            ORYX
          </span>
          <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.12)", display: "flex" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#3a3a40" }}>
            DIGITAL PRODUCT STUDIO
          </span>
        </div>

        {/* Main title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "58px", fontWeight: 700, color: "#f6f6f7", lineHeight: 1.08, letterSpacing: "-0.025em", maxWidth: "900px" }}>
            {title}
          </div>
          <div style={{ fontSize: "20px", color: "#8b8b8f", letterSpacing: "0.06em" }}>
            {sub}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: "14px", color: "#3a3a40", letterSpacing: "0.12em" }}>
            oryx.uz
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Websites", "Mobile Apps", "CRM / ERP", "AI"].map((tag) => (
              <span key={tag} style={{ fontSize: "11px", color: "#4f4f55", letterSpacing: "0.14em", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.07)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
