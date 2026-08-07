import React from "react";
import { ChevronLeft } from "lucide-react";
import { C } from "../theme.js";

export default function TopBar({ title, subtitle, onBack, dir }) {
  return (
    <div
      style={{
        padding: "calc(env(safe-area-inset-top) + 14px) 20px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: C.bg,
        borderBottom: `1px solid ${C.line}`,
        flexShrink: 0,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="cf-btn-press"
          style={{
            background: C.soft,
            border: "none",
            width: 34,
            height: 34,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={18} color={C.ink} style={{ transform: dir === "rtl" ? "rotate(180deg)" : "none" }} />
        </button>
      )}
      <div>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2, fontWeight: 500 }}>{subtitle}</div>}
      </div>
    </div>
  );
}
