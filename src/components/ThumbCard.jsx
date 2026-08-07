import React from "react";
import { Play, Clock } from "lucide-react";
import { C, fmtMoney } from "../theme.js";
import { STATUS_COLORS, STATUS_KEYS, PKG_KEYS } from "../data/packages.js";

export default function ThumbCard({ order, t }) {
  const st = STATUS_COLORS[order.status];
  const title = order.titleKey ? t[order.titleKey] : order.title;
  const [pkgNameKey] = PKG_KEYS[order.pkgId];
  const eta =
    order.etaType === "delivered"
      ? t.etaDelivered
      : order.etaType === "hours"
      ? t.etaHours(order.etaValue)
      : t.etaDays(order.etaValue);

  return (
    <div
      className="cf-card-press"
      style={{ border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: C.bg, transition: "transform .1s ease" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: `linear-gradient(135deg, ${order.grad1}, ${order.grad2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Play size={18} color={C.inkFixed} fill={C.inkFixed} style={{ marginInlineStart: -2 }} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            insetInlineStart: 8,
            background: "rgba(18,17,23,0.75)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 7px",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Clock size={10} />
          {eta}
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            insetInlineEnd: 8,
            background: st.bg,
            color: st.fg,
            fontSize: 10,
            fontWeight: 800,
            padding: "4px 9px",
            borderRadius: 999,
          }}
        >
          {t[STATUS_KEYS[order.status]]}
        </div>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, lineHeight: 1.5 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600 }}>{t.packageOf(t[pkgNameKey])}</span>
          <span style={{ fontSize: 12, color: C.ink, fontWeight: 800 }}>{fmtMoney(order.price, order.lang)}</span>
        </div>
      </div>
    </div>
  );
}
