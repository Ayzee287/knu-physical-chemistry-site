import { ImageResponse } from "next/og";

// Site-wide Open Graph / Twitter card (D031). Typographic and on-brand — the
// ink hero surface, the single copper accent, ivory text — generated at build
// time with no binary asset and no external font fetch. The card carries the
// institution's IDENTITY (Latin, proper-noun), not page text, so one image
// serves every route and both locales and there is no Cyrillic-glyph risk from
// the default font. Tokens mirror globals.css (@theme): ink #0f1b36, ivory
// #f4f0e8, copper #9a6a3f.
export const alt =
  "Department of Physical Chemistry — Taras Shevchenko National University of Kyiv";
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
          justifyContent: "space-between",
          backgroundColor: "#0f1b36",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#b07c4d",
          }}
        >
          Faculty of Chemistry
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              fontWeight: 600,
              color: "#f4f0e8",
            }}
          >
            Department of Physical Chemistry
          </div>
          <div
            style={{
              marginTop: 30,
              width: 120,
              height: 3,
              backgroundColor: "#9a6a3f",
            }}
          />
          <div
            style={{
              marginTop: 30,
              fontSize: 31,
              color: "rgba(244,240,232,0.74)",
            }}
          >
            Taras Shevchenko National University of Kyiv
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(244,240,232,0.5)" }}>
          physchem.knu.ua
        </div>
      </div>
    ),
    { ...size },
  );
}
