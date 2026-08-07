import React from "react";
import { C } from "../theme.js";

export default function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="cf-btn-press"
      style={{
        width: 42,
        height: 25,
        borderRadius: 999,
        border: "none",
        background: checked ? C.accent : C.toggleOff,
        position: "relative",
        cursor: "pointer",
        transition: "background .15s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 19,
          height: 19,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          insetInlineEnd: checked ? 20 : 3,
          transition: "inset-inline-end .15s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  );
}
