import React from "react";
import { C } from "../theme.js";

export default function SettingsRow({ icon, label, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="cf-btn-press"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 14px",
        background: C.bg,
        border: "none",
        borderBottom: `1px solid ${C.line}`,
        cursor: onClick ? "pointer" : "default",
        textAlign: "start",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: danger ? C.dangerBg : C.soft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: danger ? C.accentDark : C.ink }}>{label}</span>
      {right}
    </button>
  );
}
