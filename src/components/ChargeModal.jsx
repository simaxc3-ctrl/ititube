import React, { useState } from "react";
import { X, Copy, Check, CreditCard, Coins, Send } from "lucide-react";
import { C, FONT, fmtMoney, toToman } from "../theme.js";
import { CARD_NUMBER, CRYPTO_ADDRESS, CRYPTO_NETWORK, telegramUrl, formatCardNumber } from "../data/payment.js";

const AMOUNTS = [50000, 100000, 200000, 500000];

export default function ChargeModal({ t, lang, onClose, onCharge, customAmount, setCustomAmount }) {
  const [method, setMethod] = useState("card");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleAmountInput(raw) {
    // English (USD) allows one decimal point; fa/tr (Toman) are whole numbers only.
    const cleaned = lang === "en" ? raw.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1") : raw.replace(/\D/g, "");
    setCustomAmount(cleaned);
    setSelectedAmount(null);
  }

  function pickPreset(a) {
    setSelectedAmount(a);
    setCustomAmount("");
  }

  const amountInToman = selectedAmount || (customAmount ? toToman(parseFloat(customAmount) || 0, lang) : 0);

  function copyValue(value) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleConfirmTransfer() {
    if (!amountInToman) return;
    // Card-to-card / crypto top-ups are manually verified — we don't credit
    // the wallet automatically. Support confirms the receipt on Telegram and
    // tops up the balance from the admin side.
    onCharge(0, { pending: true, amount: amountInToman, method });
  }

  const tabBtn = (id, label, Icon) => (
    <button
      onClick={() => setMethod(id)}
      className="cf-btn-press"
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "10px 8px",
        borderRadius: 12,
        border: `1.5px solid ${method === id ? C.blue : C.line}`,
        background: method === id ? C.selectBg : C.soft,
        color: method === id ? C.blueDark : C.inkSoft,
        fontFamily: FONT,
        fontSize: 12.5,
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      <Icon size={15} />
      {label}
    </button>
  );

  return (
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(18,17,23,0.45)", display: "flex", alignItems: "flex-end", zIndex: 40 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="cf-scroll"
        style={{
          width: "100%",
          maxHeight: "88%",
          overflowY: "auto",
          background: C.bg,
          borderRadius: "24px 24px 0 0",
          padding: "18px 20px calc(env(safe-area-inset-bottom) + 26px)",
          animation: "cf-pop .2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15.5, fontWeight: 800, color: C.ink }}>{t.chargeTitle}</span>
          <button onClick={onClose} style={{ background: C.soft, border: "none", borderRadius: 9, width: 30, height: 30, cursor: "pointer" }}>
            <X size={15} color={C.ink} style={{ margin: "auto" }} />
          </button>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginTop: 18, marginBottom: 10 }}>{t.chargeStep1}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => pickPreset(a)}
              className="cf-btn-press"
              style={{
                border: `1.5px solid ${selectedAmount === a ? C.blue : C.line}`,
                borderRadius: 12,
                padding: 12,
                background: selectedAmount === a ? C.selectBg : C.soft,
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 700,
                color: selectedAmount === a ? C.blueDark : C.ink,
                cursor: "pointer",
              }}
            >
              {fmtMoney(a, lang)}
            </button>
          ))}
        </div>
        <input
          value={customAmount}
          onChange={(e) => handleAmountInput(e.target.value)}
          placeholder={t.customAmountPh}
          inputMode={lang === "en" ? "decimal" : "numeric"}
          style={{ width: "100%", boxSizing: "border-box", marginTop: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 13px", fontSize: 13, fontFamily: FONT, outline: "none", color: C.ink }}
        />

        <div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginTop: 20, marginBottom: 10 }}>{t.chargeStep2}</div>
        <div style={{ display: "flex", gap: 10 }}>
          {tabBtn("card", t.chargeMethodCard, CreditCard)}
          {tabBtn("crypto", t.chargeMethodCrypto, Coins)}
        </div>

        {method === "card" && (
          <div style={{ marginTop: 14, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, background: `linear-gradient(135deg, ${C.heroBg} 0%, #2A2733 100%)` }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>{t.cardNumberLabel}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: 1.5, direction: "ltr" }}>{formatCardNumber(CARD_NUMBER)}</span>
              <button
                onClick={() => copyValue(CARD_NUMBER)}
                className="cf-btn-press"
                style={{ background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 9, padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontFamily: FONT, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {t.copyBtn}
              </button>
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11.5, fontWeight: 500, marginTop: 12, lineHeight: 1.8 }}>{t.cardChargeNote}</div>
          </div>
        )}

        {method === "crypto" && (
          <div style={{ marginTop: 14, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, background: `linear-gradient(135deg, ${C.heroBg} 0%, #2A2733 100%)` }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>{t.cryptoAddressLabel}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, gap: 8 }}>
              <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 700, letterSpacing: 0.3, direction: "ltr", wordBreak: "break-all" }}>
                {CRYPTO_ADDRESS || "—"}
              </span>
              {CRYPTO_ADDRESS && (
                <button
                  onClick={() => copyValue(CRYPTO_ADDRESS)}
                  className="cf-btn-press"
                  style={{ flexShrink: 0, background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 9, padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontFamily: FONT, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {t.copyBtn}
                </button>
              )}
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10.5, fontWeight: 600, marginTop: 4 }}>{CRYPTO_NETWORK}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11.5, fontWeight: 500, marginTop: 12, lineHeight: 1.8 }}>{t.cryptoNote}</div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            onClick={handleConfirmTransfer}
            disabled={!amountInToman}
            className="cf-btn-press"
            style={{
              flex: 1,
              background: amountInToman ? `linear-gradient(135deg, ${C.blue}, ${C.accent})` : C.line,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "13px",
              fontSize: 13,
              fontFamily: FONT,
              fontWeight: 800,
              cursor: amountInToman ? "pointer" : "not-allowed",
            }}
          >
            {t.iPaidBtn}
          </button>
          <a
            href={telegramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-btn-press"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              textDecoration: "none",
              border: `1.5px solid ${C.line}`,
              borderRadius: 12,
              padding: "0 16px",
              color: C.ink,
              fontFamily: FONT,
              fontSize: 12.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <Send size={14} />
            {t.openTelegramBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
