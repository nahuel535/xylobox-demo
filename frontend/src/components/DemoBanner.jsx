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
        background: "rgba(29, 64, 50, 0.96)",
        border: "1px solid rgba(61, 138, 110, 0.4)",
        backdropFilter: "blur(14px)",
        borderRadius: 999,
        padding: "10px 20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
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
          background: "#4ade80",
          flexShrink: 0,
          boxShadow: "0 0 0 3px rgba(74,222,128,0.25)",
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.01em",
        }}
      >
        Modo Demo
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
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Los datos son simulados · Las acciones no se guardan
      </span>
    </div>
  );
}
