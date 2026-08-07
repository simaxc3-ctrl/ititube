// Colors that adapt to light/dark mode are read from CSS variables
// (defined in index.css and flipped via the `data-theme` attribute on <html>).
// Brand accent colors stay fixed across both themes.
export const C = {
  bg: "var(--cf-bg)",
  soft: "var(--cf-soft)",
  ink: "var(--cf-ink)",
  inkSoft: "var(--cf-inkSoft)",
  accent: "#FF3B30",
  accentDark: "#D92B21",
  blue: "#0A84FF",
  blueDark: "#0862C4",
  line: "var(--cf-line)",
  success: "#1FAA59",
  successBg: "var(--cf-successBg)",
  selectBg: "var(--cf-selectBg)",
  iconBg: "var(--cf-iconBg)",
  dangerBg: "var(--cf-dangerBg)",
  toggleOff: "var(--cf-toggleOff)",
  // Fixed dark brand-gradient surfaces (hero / wallet cards) — intentionally
  // stay dark in both light and dark mode, so they use fixed values, not C.ink.
  heroBg: "#121117",
  heroBg2: "#2A2733",
  // Fixed dark text/icon color for content placed on surfaces that are always
  // light regardless of theme (e.g. white pills/buttons drawn on the dark hero
  // cards). Do not use C.ink there since it flips to a light color in dark mode.
  inkFixed: "#121117",
};

export const FONT = "'Vazirmatn', sans-serif";

export const LOCALE_MAP = { fa: "fa-IR", en: "en-US", tr: "tr-TR" };
export const CURR_LABEL = { fa: "تومان", en: "$", tr: "Tümen" };

// Amounts everywhere in the app are stored internally in Toman (fa/tr).
// When the language is English, we convert and show USD instead of Toman/Rial.
// This rate is an approximation — update it to match a current exchange rate.
export const USD_PER_TOMAN = 1 / 60000;

export function fmtMoney(n, lang) {
  if (lang === "en") {
    const usd = n * USD_PER_TOMAN;
    const opts = usd >= 100 ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return `$${usd.toLocaleString("en-US", opts)}`;
  }
  return `${n.toLocaleString(LOCALE_MAP[lang])} ${CURR_LABEL[lang]}`;
}

// Converts a raw amount typed by the user (in the currently displayed
// currency) back into Toman, which is how balances/prices are stored
// internally. English input is USD; fa/tr input is already Toman.
export function toToman(amount, lang) {
  if (!amount) return 0;
  return lang === "en" ? Math.round(amount / USD_PER_TOMAN) : Math.round(amount);
}
