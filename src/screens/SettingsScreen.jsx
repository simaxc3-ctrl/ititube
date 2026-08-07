import React from "react";
import { Wallet, CreditCard, Bell, Globe, Image as ImageIcon, HelpCircle, Shield, LogOut, ChevronLeft } from "lucide-react";
import { C, FONT } from "../theme.js";
import { telegramUrl } from "../data/payment.js";
import TopBar from "../components/TopBar.jsx";
import SettingsRow from "../components/SettingsRow.jsx";
import Toggle from "../components/Toggle.jsx";

export default function SettingsScreen({
  t, lang, name, setName, email, setEmail, notifOn, setNotifOn, darkMode, setDarkMode, dir,
  onWallet, onToast, onOpenLang, onLogout,
}) {
  const langLabelKey = `lang${lang[0].toUpperCase()}${lang.slice(1)}`;
  return (
    <>
      <TopBar title={t.settingsTitle} subtitle={t.settingsSubtitle} dir={dir} />
      <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
            {name.trim()[0] || "S"}
          </div>
          <div style={{ flex: 1 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", border: "none", borderBottom: `1px solid ${C.line}`, fontSize: 14, fontWeight: 700, fontFamily: FONT, padding: "4px 2px", color: C.ink, outline: "none" }}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", border: "none", fontSize: 11.5, fontFamily: FONT, padding: "5px 2px 0", color: C.inkSoft, outline: "none" }}
            />
          </div>
        </div>

        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.inkSoft, margin: "22px 0 8px" }}>{t.accountSection}</div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          <SettingsRow icon={<Wallet size={15} color={C.ink} />} label={t.walletRow} right={<ChevronLeft size={15} color={C.inkSoft} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />} onClick={onWallet} />
          <SettingsRow icon={<CreditCard size={15} color={C.ink} />} label={t.paymentMethodsRow} right={<ChevronLeft size={15} color={C.inkSoft} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />} onClick={() => onToast(t.toastComingSoon)} />
        </div>

        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.inkSoft, margin: "20px 0 8px" }}>{t.prefsSection}</div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          <SettingsRow icon={<Bell size={15} color={C.ink} />} label={t.notifRow} right={<Toggle checked={notifOn} onChange={setNotifOn} />} />
          <SettingsRow
            icon={<Globe size={15} color={C.ink} />}
            label={t.languageRow}
            right={
              <span style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                {t[langLabelKey]}
                <ChevronLeft size={13} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />
              </span>
            }
            onClick={onOpenLang}
          />
          <SettingsRow icon={<ImageIcon size={15} color={C.ink} />} label={t.darkModeRow} right={<Toggle checked={darkMode} onChange={setDarkMode} />} />
        </div>

        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.inkSoft, margin: "20px 0 8px" }}>{t.supportSection}</div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          <SettingsRow icon={<HelpCircle size={15} color={C.ink} />} label={t.helpRow} right={<ChevronLeft size={15} color={C.inkSoft} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />} onClick={() => window.open(telegramUrl(), "_blank", "noopener,noreferrer")} />
          <SettingsRow icon={<Shield size={15} color={C.ink} />} label={t.privacyRow} right={<ChevronLeft size={15} color={C.inkSoft} style={{ transform: dir === "ltr" ? "rotate(180deg)" : "none" }} />} onClick={() => onToast(t.toastComingSoon)} />
        </div>

        <div style={{ marginTop: 20, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          <SettingsRow icon={<LogOut size={15} color={C.accentDark} />} label={t.logoutRow} danger onClick={onLogout} />
        </div>

        <div style={{ textAlign: "center", fontSize: 10.5, color: C.inkSoft, marginTop: 18, fontWeight: 500 }}>{t.versionLabel}</div>
      </div>
    </>
  );
}
