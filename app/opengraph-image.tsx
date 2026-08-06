import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
// Required by `output: export`: emit at build time rather than per request.
export const dynamic = "force-static";

/**
 * Generated OG/Twitter card.
 *
 * Without this, the `summary_large_image` card silently degrades to a small
 * text card — which costs click-through on every share, and share signals
 * feed back into rankings.
 *
 * Rendered at build time; no external assets, so it cannot fail on a font or
 * image fetch.
 */

export const alt = `${siteConfig.name} · ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        {/* Terminal chrome, mirroring the site's identity */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div
              key={c}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: c,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Plain ASCII only — non-Latin glyphs make Satori attempt a remote
            font download, which fails the build. */}
        <div style={{ display: "flex", fontSize: "32px", color: "#27c93f" }}>
          <span style={{ marginRight: "16px" }}>$</span>
          <span style={{ color: "#60a5fa", marginRight: "16px" }}>~</span>
          <span style={{ color: "#a1a1aa" }}>whoami</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "88px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginTop: "24px",
          }}
        >
          {siteConfig.handle}
          <span style={{ color: "#52525b" }}>.dev</span>
        </div>

        <div style={{ fontSize: "36px", color: "#a1a1aa", marginTop: "16px" }}>
          {siteConfig.jobTitle}
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#52525b",
            marginTop: "40px",
            display: "flex",
          }}
        >
          <span>{siteConfig.location.country}</span>
          <span style={{ margin: "0 16px" }}>/</span>
          <span>{siteConfig.skills.slice(0, 3).join("  /  ")}</span>
        </div>
      </div>
    ),
    size,
  );
}
