import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { C, FONT } from "../theme.js";
import Logo from "../components/Logo.jsx";
import GoogleG from "../components/GoogleG.jsx";

export default function LoginScreen({ t, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "40px 26px 26px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Logo size={64} />
        <div style={{ fontSize: 21, fontWeight: 800, color: C.ink, marginTop: 14 }}>{t.appName}</div>
        <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 4, fontWeight: 500 }}>{t.loginTagline}</div>
      </div>

      <div style={{ width: "100%", marginTop: 40 }}>
        <button
          onClick={() => onLogin("google")}
          className="cf-btn-press"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: C.bg, border: `1.5px solid ${C.line}`, borderRadius: 14, padding: "13px", fontSize: 13.5, fontWeight: 700, color: C.ink, cursor: "pointer" }}
        >
          <GoogleG size={18} />
          {t.continueWithGoogle}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.line }} />
          <span style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600 }}>{t.or}</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
          <Mail size={16} color={C.inkSoft} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPh}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: FONT, color: C.ink, background: "transparent" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 14px" }}>
          <Lock size={16} color={C.inkSoft} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={t.passwordPh}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: FONT, color: C.ink, background: "transparent" }}
          />
        </div>

        <button
          onClick={() => onLogin("email")}
          className="cf-btn-press"
          style={{ width: "100%", marginTop: 16, background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`, color: "#fff", border: "none", borderRadius: 14, padding: "13px", fontSize: 13.5, fontWeight: 800, cursor: "pointer" }}
        >
          {t.loginWithEmail}
        </button>

        <div style={{ textAlign: "center", fontSize: 10.5, color: C.inkSoft, marginTop: 18, fontWeight: 500, lineHeight: 1.6 }}>{t.termsNote}</div>
      </div>
    </div>
  );
}
