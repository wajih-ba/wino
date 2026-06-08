import { useEffect, useState } from "react";

/** Wraps children and shows a rotate-phone overlay on portrait mobile. */
export function RotatePrompt({ children }: { children: React.ReactNode }) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsPortraitMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative">
      {/* blur the mockup in portrait mobile */}
      <div
        style={{
          filter: isPortraitMobile ? "blur(6px)" : "none",
          pointerEvents: isPortraitMobile ? "none" : "auto",
          transition: "filter 0.3s ease",
          userSelect: isPortraitMobile ? "none" : "auto",
        }}
      >
        {children}
      </div>

      {/* rotate overlay */}
      {isPortraitMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            zIndex: 20,
            background: "rgba(0,0,0,0.25)",
            borderRadius: "1rem",
          }}
        >
          {/* animated phone icon */}
          <div
            style={{
              animation: "rotatePhone 1.8s ease-in-out infinite",
              fontSize: "3rem",
              lineHeight: 1,
            }}
          >
            📱
          </div>
          <p
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "0 1rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Rotate your phone for the best experience
          </p>
          <style>{`
            @keyframes rotatePhone {
              0%   { transform: rotate(0deg); }
              30%  { transform: rotate(90deg); }
              60%  { transform: rotate(90deg); }
              100% { transform: rotate(0deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
