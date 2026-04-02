export default function DemoBanner() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(245,245,245,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        borderRadius: 999,
        padding: "10px 20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#f5f5f5",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "rgba(245,245,245,0.9)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Velto Demo
      </span>
      <span
        style={{
          width: 1,
          height: 14,
          background: "rgba(255,255,255,0.15)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        Sistema 100% personalizado a tu marca · Datos simulados
      </span>
    </div>
  );
}
