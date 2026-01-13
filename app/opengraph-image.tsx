import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Tallify - Haz que tu dinero cuente";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#071C11", // Verde Pino (background dark)
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1a3a2e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a3a2e 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          {/* Logo and Brand Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {/* Logo SVG */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 47 48"
              style={{ borderRadius: "20px" }}
            >
              <rect width="47" height="48" rx="8" fill="#9FFF66" />
              <path
                d="M20 15.829V38.0055H26.44V15.829H37V10.0055L26.44 10L20 15.829Z"
                fill="#101816"
              />
              <path d="M20 15.829V10.0056L10 10V15.829H20Z" fill="#101816" />
            </svg>
            <div
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                color: "#FFFFFF",
                letterSpacing: "-2px",
              }}
            >
              Tallify
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#9FFF66", // Verde Vibrante
              textAlign: "center",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Haz que tu dinero cuente
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#D1D5DB", // text-gray-300
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Gestiona tus gastos e ingresos en tiempo real. Gratis para siempre.
          </div>

          {/* Features Pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(159, 255, 102, 0.1)", // Verde Vibrante 10%
                border: "2px solid #9FFF66",
                borderRadius: "999px",
                padding: "12px 24px",
                fontSize: "20px",
                color: "#9FFF66",
                fontWeight: "600",
              }}
            >
              ✓ Dashboard Inteligente
            </div>
            <div
              style={{
                backgroundColor: "rgba(159, 255, 102, 0.1)",
                border: "2px solid #9FFF66",
                borderRadius: "999px",
                padding: "12px 24px",
                fontSize: "20px",
                color: "#9FFF66",
                fontWeight: "600",
              }}
            >
              ✓ Quick Add &lt; 3s
            </div>
            <div
              style={{
                backgroundColor: "rgba(159, 255, 102, 0.1)",
                border: "2px solid #9FFF66",
                borderRadius: "999px",
                padding: "12px 24px",
                fontSize: "20px",
                color: "#9FFF66",
                fontWeight: "600",
              }}
            >
              ✓ WCAG 2.1 AA
            </div>
          </div>
        </div>

        {/* Decorative Gradient Orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(159, 255, 102, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(159, 255, 102, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
