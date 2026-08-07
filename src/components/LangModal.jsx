import React from "react";
import { X, Globe, Check } from "lucide-react";
import { C } from "../theme.js";

export default function LangModal({ t, lang, setLang, onClose }) {
  const options = [
    { id: "fa", label: t.langFa },
    { id: "en", label: t.langEn },
    { id: "tr", label: t.langTr },
  ];
  return (
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(18,17,23,0.45)", display: "flex", alignItems: "flex-end", zIndex: 40 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: C.bg,
          borderRadius: "24px 24px 0 0",
          padding: "18px 20px calc(env(safe-area-inset-bottom) + 26px)",
          animation: "cf-pop .2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 15.5, fontWeight: 800, color: C.ink }}>{t.chooseLanguage}</span>
          <button onClick={onClose} style={{ background: C.soft, border: "none", borderRadius: 9, width: 30, height: 30, cursor: "pointer" }}>
            <X size={15} color={C.ink} style={{ margin: "auto" }} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => setLang(o.id)}
              className="cf-btn-press"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: `1.5px solid ${lang === o.id ? C.blue : C.line}`,
                borderRadius: 12,
                padding: "13px 15px",
                background: lang === o.id ? C.selectBg : C.bg,
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 700, color: C.ink }}>
                <Globe size={15} color={C.inkSoft} />
                {o.label}
              </span>
              {lang === o.id && <Check size={15} color={C.blue} strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
