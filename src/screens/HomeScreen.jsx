import React from "react";
import { ChevronLeft, Plus, Sparkles, Wallet, Wand2 } from "lucide-react";
import { C, fmtMoney } from "../theme.js";
import Logo from "../components/Logo.jsx";
import ThumbCard from "../components/ThumbCard.jsx";

export default function HomeScreen({ t, lang, dir, balance, orders, onNewOrder, onWallet, onAi }) {
  return (
    <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>{t.welcome}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, marginTop: 2 }}>{t.appName}</div>
        </div>
        <Logo size={38} />
      </div>

      <div style={{ marginTop: 18, borderRadius: 22, padding: 20, background: `linear-gradient(135deg, ${C.ink} 0%, #2A2733 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", insetInlineStart: -20, top: -20, width: 110, height: 110, borderRadius: "50%", background: C.blue, opacity: 0.18 }} />
        <div style={{ position: "absolute", insetInlineEnd: -30, bottom: -30, width: 100, height: 100, borderRadius: "50%", background: C.accent, opacity: 0.16 }} />
        <Sparkles size={20} color={C.blue} />
        <div style={{ color: "#fff", fontSize: 16.5, fontWeight: 800, marginTop: 10, lineHeight: 1.6, position: "relative" }}>{t.heroTitle}</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12.5, marginTop: 4, fontWeight: 500, position: "relative" }}>{t.heroSub}</div>
        <button
          onClick={onNewOrder}
          className="cf-btn-press"
          style={{ marginTop: 16, background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, color: "#fff", border: "none", borderRadius: 12, padding: "11px 18px", fontSize: 13.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", position: "relative" }}
        >
          <Plus size={16} />
          {t.newOrderBtn}
        </button>
      </div>

      <button
        onClick={onWallet}
        className="cf-card-press cf-btn-press"
        style={{ marginTop: 14, width: "100%", border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px", background: C.bg, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wallet size={17} color={C.success} />
          </div>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600 }}>{t.walletBalance}</div>
            <div style={{ fontSize: 15, color: C.ink, fontWeight: 800 }}>{fmtMoney(balance, lang)}</div>
          </div>
        </div>
        <ChevronLeft size={17} color={C.inkSoft} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />
      </button>

      <button
        onClick={onAi}
        className="cf-card-press cf-btn-press"
        style={{
          marginTop: 12,
          width: "100%",
          border: "none",
          borderRadius: 16,
          padding: "14px 16px",
          background: `linear-gradient(120deg, ${C.blueDark} 0%, ${C.accent} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wand2 size={17} color="#fff" />
          </div>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 800 }}>{t.aiCardTitle}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginTop: 1 }}>{t.aiCardSub}</div>
          </div>
        </div>
        <ChevronLeft size={17} color="#fff" style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />
      </button>

      <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14.5, fontWeight: 800, color: C.ink }}>{t.recentOrders}</span>
        <span style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 600 }}>{t.ordersCount(orders.length)}</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map((o) => (
          <ThumbCard key={o.id} order={o} t={t} />
        ))}
      </div>
    </div>
  );
}
