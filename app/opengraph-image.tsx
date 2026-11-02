import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0B0C";
const ALARM = "#E5401F";
const SAND = "#EDE6DA";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: INK, color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ height: 14, background: ALARM, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "36px 70px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 56, height: 56, background: ALARM, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", width: 28, height: 8, background: "#fff" }} />
              <div style={{ position: "absolute", width: 8, height: 28, background: "#fff" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Ubuntu Relief</div>
              <div style={{ fontSize: 14, letterSpacing: 6, color: "#A9A9B0", textTransform: "uppercase" }}>Network · Nigeria</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", border: `2px solid ${ALARM}`, color: ALARM, fontSize: 18, fontWeight: 700, letterSpacing: 4 }}>
            ● EMERGENCY RESPONSE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "0 70px", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", borderTop: "6px solid #fff", paddingTop: 22, fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -1, textTransform: "uppercase", maxWidth: 1060 }}>
            First in. Last out.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: SAND, marginTop: 18 }}>Floods · Displacement · Cholera · Food crises — across Nigeria</div>
        </div>

        <div style={{ display: "flex", background: "#1A1A1D", borderTop: "1px solid #2A2A2E", height: 70, alignItems: "stretch" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#C9361A", padding: "0 26px", fontSize: 20, fontWeight: 800, letterSpacing: 3 }}>SITUATION LIVE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "0 26px", fontSize: 20 }}>
            <span style={{ color: "#A9A9B0" }}>09:40</span>
            <span style={{ color: ALARM, fontWeight: 700, letterSpacing: 2 }}>BORNO</span>
            <span>412,000 affected · 87,450 reached · every gift matched</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
