import React, { useState, useRef } from "react";
import { Check, Upload } from "lucide-react";
import { C, FONT, fmtMoney } from "../theme.js";
import { PACKAGES, PKG_KEYS } from "../data/packages.js";
import TopBar from "../components/TopBar.jsx";

export default function OrderScreen({ t, lang, dir, onBack, onSubmit, balance }) {
  const [selected, setSelected] = useState("pro");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [refPreview, setRefPreview] = useState(null);
  const fileRef = useRef(null);
  const pkg = PACKAGES.find((p) => p.id === selected);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setRefPreview(URL.createObjectURL(file));
  }

  return (
    <>
      <TopBar title={t.orderTitle} subtitle={t.orderSubtitle} onBack={onBack} dir={dir} />
      <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{t.choosePackage}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PACKAGES.map((p) => {
            const [nameKey, descKey] = PKG_KEYS[p.id];
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className="cf-btn-press"
                style={{ textAlign: "start", border: `2px solid ${selected === p.id ? p.color : C.line}`, borderRadius: 14, padding: "12px 14px", background: selected === p.id ? C.selectBg : C.bg, cursor: "pointer", position: "relative" }}
              >
                {p.badge && (
                  <span style={{ position: "absolute", top: -9, insetInlineStart: 12, background: C.blue, color: "#fff", fontSize: 9.5, fontWeight: 800, padding: "2px 8px", borderRadius: 999 }}>
                    {t.bestSeller}
                  </span>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: C.ink }}>{t[nameKey]}</div>
                    <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 2, fontWeight: 500 }}>{t[descKey]}</div>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${selected === p.id ? p.color : C.line}`,
                      background: selected === p.id ? p.color : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {selected === p.id && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 800, color: p.color }}>{fmtMoney(p.price, lang)}</div>
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, margin: "20px 0 8px" }}>{t.videoTitleLabel}</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.videoTitlePh}
          style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 13px", fontSize: 13, fontFamily: FONT, outline: "none", color: C.ink }}
        />

        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, margin: "16px 0 8px" }}>{t.styleLabel}</div>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={t.stylePh}
          rows={3}
          style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 13px", fontSize: 13, fontFamily: FONT, outline: "none", resize: "none", color: C.ink }}
        />

        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, margin: "16px 0 8px" }}>{t.refLabel}</div>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} style={{ display: "none" }} />
        <button
          onClick={() => fileRef.current?.click()}
          className="cf-btn-press"
          style={{ width: "100%", border: `1.5px dashed ${C.line}`, borderRadius: 12, padding: refPreview ? 8 : "18px 13px", background: C.soft, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, justifyContent: refPreview ? "flex-start" : "center" }}
        >
          {refPreview ? (
            <>
              <img src={refPreview} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{t.refChosen}</span>
            </>
          ) : (
            <>
              <Upload size={16} color={C.inkSoft} />
              <span style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600 }}>{t.refChoose}</span>
            </>
          )}
        </button>

        <div style={{ marginTop: 22, borderRadius: 14, background: C.soft, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 600 }}>{t.payAmount}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginTop: 2 }}>{fmtMoney(pkg.price, lang)}</div>
          </div>
          <div style={{ fontSize: 11, color: balance >= pkg.price ? C.success : C.accentDark, fontWeight: 700 }}>
            {t.balanceLabel} {fmtMoney(balance, lang)}
          </div>
        </div>

        <button
          onClick={() => onSubmit(pkg, title, refPreview)}
          className="cf-btn-press"
          style={{ width: "100%", marginTop: 14, background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, color: "#fff", border: "none", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
        >
          {t.submitOrder}
        </button>
      </div>
    </>
  );
}
