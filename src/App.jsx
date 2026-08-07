import React, { useState } from "react";
import { C, FONT, fmtMoney } from "./theme.js";
import { STR } from "./i18n.js";
import { PACKAGES } from "./data/packages.js";

import LoginScreen from "./screens/LoginScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import WalletScreen from "./screens/WalletScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import AiScreen from "./screens/AiScreen.jsx";

import BottomNav from "./components/BottomNav.jsx";
import ChargeModal from "./components/ChargeModal.jsx";
import LangModal from "./components/LangModal.jsx";

export default function App() {
  const [lang, setLang] = useState("fa");
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("home");
  const [balance, setBalance] = useState(180000);
  const [toast, setToast] = useState(null);
  const [chargeOpen, setChargeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [notifOn, setNotifOn] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("cf-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [name, setName] = useState(STR.fa.defaultName);
  const [email, setEmail] = useState("sara.mohammadi@example.com");

  const t = STR[lang];
  const dir = lang === "fa" ? "rtl" : "ltr";

  const [orders, setOrders] = useState([
    { id: 1, titleKey: "seedOrder1", pkgId: "pro", price: 250000, status: "delivered", etaType: "delivered", grad1: "#FFB199", grad2: "#FF3B30", lang: "fa" },
    { id: 2, titleKey: "seedOrder2", pkgId: "standard", price: 120000, status: "progress", etaType: "hours", etaValue: 14, grad1: "#8FC4FF", grad2: C.blue, lang: "fa" },
  ]);

  const gradPool = [["#A8E6CF", "#1FAA59"], ["#B8C6FF", C.blue], ["#FFD3A5", "#FF6F3C"], ["#D6B8FF", "#8B3FE0"]];

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    try {
      localStorage.setItem("cf-theme", darkMode ? "dark" : "light");
    } catch {}
  }, [darkMode]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function handleLogin(who) {
    if (who === "google" && name === t.defaultName) setName(t.googleName);
    setLoggedIn(true);
    showToast(t.toastWelcome(who === "google" ? t.googleName : name));
  }

  function handleCharge(amount, opts) {
    if (opts && opts.pending) {
      // Card-to-card / crypto top-ups are verified manually by support on
      // Telegram before the balance is actually credited.
      setChargeOpen(false);
      setCustomAmount("");
      showToast(t.chargeRequestToast);
      return;
    }
    if (!amount) return;
    setBalance((b) => b + amount);
    setChargeOpen(false);
    setCustomAmount("");
    showToast(t.toastCharged(fmtMoney(amount, lang)));
  }

  function handleSubmitOrder(pkg, title, refPreview) {
    if (balance < pkg.price) {
      showToast(t.toastInsufficient);
      setScreen("wallet");
      return;
    }
    setBalance((b) => b - pkg.price);
    const g = gradPool[orders.length % gradPool.length];
    const newOrder = {
      id: Date.now(),
      title: title || t.newOrderBtn,
      pkgId: pkg.id,
      price: pkg.price,
      status: "queued",
      etaType: pkg.id === "express" ? "hours" : "days",
      etaValue: pkg.id === "express" ? 6 : 2,
      grad1: g[0],
      grad2: g[1],
      refPreview,
      lang,
    };
    setOrders((o) => [newOrder, ...o]);
    showToast(t.toastOrderSuccess);
    setScreen("home");
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: C.bg,
        fontFamily: FONT,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      dir={dir}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: "env(safe-area-inset-top)" }}>
        {!loggedIn ? (
          <LoginScreen t={t} onLogin={handleLogin} />
        ) : (
          <>
            {screen === "home" && (
              <HomeScreen t={t} lang={lang} dir={dir} balance={balance} orders={orders} onNewOrder={() => setScreen("order")} onWallet={() => setScreen("wallet")} onAi={() => setScreen("ai")} />
            )}
            {screen === "ai" && <AiScreen t={t} lang={lang} dir={dir} onBack={() => setScreen("home")} />}
            {screen === "order" && (
              <OrderScreen t={t} lang={lang} dir={dir} onBack={() => setScreen("home")} onSubmit={handleSubmitOrder} balance={balance} />
            )}
            {screen === "wallet" && (
              <WalletScreen t={t} lang={lang} dir={dir} balance={balance} onBack={() => setScreen("home")} onOpenCharge={() => setChargeOpen(true)} orders={orders} />
            )}
            {screen === "settings" && (
              <SettingsScreen
                t={t}
                lang={lang}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                notifOn={notifOn}
                setNotifOn={setNotifOn}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                dir={dir}
                onWallet={() => setScreen("wallet")}
                onToast={showToast}
                onOpenLang={() => setLangOpen(true)}
                onLogout={() => {
                  setLoggedIn(false);
                  setScreen("home");
                  showToast(t.toastLogout);
                }}
              />
            )}
          </>
        )}
      </div>

      {loggedIn && <BottomNav t={t} screen={screen} setScreen={setScreen} />}

      {chargeOpen && (
        <ChargeModal t={t} lang={lang} onClose={() => setChargeOpen(false)} onCharge={handleCharge} customAmount={customAmount} setCustomAmount={setCustomAmount} />
      )}
      {langOpen && (
        <LangModal
          t={t}
          lang={lang}
          setLang={(l) => {
            setLang(l);
            setLangOpen(false);
            showToast(STR[l].toastLangChanged);
          }}
          onClose={() => setLangOpen(false)}
        />
      )}

      {toast && (
        <div
          style={{
            position: "absolute",
            bottom: loggedIn ? "calc(env(safe-area-inset-bottom) + 86px)" : "calc(env(safe-area-inset-bottom) + 24px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: C.inkFixed,
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 600,
            padding: "10px 18px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            animation: "cf-toast 2.6s ease forwards",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
