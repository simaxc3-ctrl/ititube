import React from "react";
import { Home, Wallet, Settings as SettingsIcon, Plus } from "lucide-react";
import { C } from "../theme.js";

export default function BottomNav({ t, screen, setScreen }) {
  const items = [
    { id: "home", label: t.navHome, icon: Home },
    { id: "wallet", label: t.navWallet, icon: Wallet },
    { id: "order", label: t.navOrder, icon: Plus, fab: true },
    { id: "settings", label: t.navSettings, icon: SettingsIcon },
  ];
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 14px calc(env(safe-area-inset-bottom) + 12px)",
        borderTop: `1px solid ${C.line}`,
        background: C.bg,
      }}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const active = screen === it.id;
        if (it.fab) {
          return (
            <button
              key={it.id}
              onClick={() => setScreen(it.id)}
              className="cf-btn-press"
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -22,
                boxShadow: "0 8px 18px rgba(255,59,48,0.35)",
                cursor: "pointer",
              }}
            >
              <Icon size={22} color="#fff" strokeWidth={2.5} />
            </button>
          );
        }
        return (
          <button
            key={it.id}
            onClick={() => setScreen(it.id)}
            className="cf-btn-press"
            style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 10px" }}
          >
            <Icon size={19} color={active ? C.accent : C.inkSoft} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontSize: 9.5, fontWeight: active ? 800 : 600, color: active ? C.accent : C.inkSoft }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
