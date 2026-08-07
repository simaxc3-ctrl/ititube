import React from "react";
import { CreditCard, Coins, TrendingUp, Image as ImageIcon } from "lucide-react";
import { C, fmtMoney } from "../theme.js";
import { PKG_KEYS } from "../data/packages.js";
import Logo from "../components/Logo.jsx";
import TopBar from "../components/TopBar.jsx";

export default function WalletScreen({ t, lang, dir, balance, onBack, onOpenCharge, orders }) {
  const spent = orders.reduce((s, o) => s + o.price, 0);
  return (
    <>
      <TopBar title={t.walletTitle} subtitle={t.walletSubtitle} onBack={onBack} dir={dir} />
      <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
        <div style={{ borderRadius: 22, padding: 22, background: `linear-gradient(120deg, ${C.heroBg} 0%, #23212C 55%, ${C.blueDark} 100%)`, position: "relative", overflow: "hidden", boxShadow: "0 14px 30px rgba(18,17,23,0.25)" }}>
          <div style={{ position: "absolute", insetInlineEnd: -40, top: -40, width: 160, height: 160, borderRadius: "50%", background: C.accent, opacity: 0.22 }} />
          <div style={{ position: "absolute", insetInlineStart: -30, bottom: -50, width: 140, height: 140, borderRadius: "50%", background: C.blue, opacity: 0.25 }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600 }}>{t.currentBalance}</div>
            <Logo size={26} />
          </div>
          <div style={{ position: "relative", color: "#fff", fontSize: 27, fontWeight: 800, marginTop: 8, letterSpacing: 0.3 }}>{fmtMoney(balance, lang)}</div>
          <button
            onClick={onOpenCharge}
            className="cf-btn-press"
            style={{ position: "relative", marginTop: 18, background: "#fff", color: C.inkFixed, border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
          >
            <CreditCard size={15} />
            {t.chargeWallet}
          </button>
          <div style={{ position: "relative", display: "flex", gap: 8, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "6px 12px" }}>
              <CreditCard size={12} color="rgba(255,255,255,0.85)" />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{t.chargeMethodCard}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "6px 12px" }}>
              <Coins size={12} color="rgba(255,255,255,0.85)" />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{t.chargeMethodCrypto}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 14px", boxShadow: "0 4px 14px rgba(18,17,23,0.04)" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: C.successBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <TrendingUp size={15} color={C.success} />
            </div>
            <div style={{ fontSize: 10.5, color: C.inkSoft, fontWeight: 600 }}>{t.spentThisMonth}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginTop: 2 }}>{fmtMoney(spent, lang)}</div>
          </div>
          <div style={{ flex: 1, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 14px", boxShadow: "0 4px 14px rgba(18,17,23,0.04)" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <ImageIcon size={15} color={C.blueDark} />
            </div>
            <div style={{ fontSize: 10.5, color: C.inkSoft, fontWeight: 600 }}>{t.totalOrders}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginTop: 2 }}>{orders.length}</div>
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: "20px 0 10px" }}>{t.orderHistory}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {orders.map((o) => {
            const [nameKey] = PKG_KEYS[o.pkgId];
            const title = o.titleKey ? t[o.titleKey] : o.title;
            return (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${o.grad1}, ${o.grad2})`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{title}</div>
                    <div style={{ fontSize: 10.5, color: C.inkSoft, marginTop: 2, fontWeight: 600 }}>{t[nameKey]}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: C.accentDark }}>-{fmtMoney(o.price, lang)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
