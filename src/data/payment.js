// Central place to edit payment & support details for the whole app.
// Update these values any time — nothing else in the code needs to change.

// Telegram username for support (without the @). Tapping "Support" in
// Settings, and the "send receipt" buttons in the charge modal, open
// https://t.me/<SUPPORT_TELEGRAM>
export const SUPPORT_TELEGRAM = "ititube";

// Iranian bank card number for card-to-card top-ups (کارت به کارت).
export const CARD_NUMBER = "6219861983667899";

// TODO: replace with your real USDT (TRC20) wallet address before publishing.
// Leave it empty ("") to hide the crypto tab until you add a real address.
export const CRYPTO_ADDRESS = "";
export const CRYPTO_NETWORK = "USDT · TRC20";

export function telegramUrl() {
  return `https://t.me/${SUPPORT_TELEGRAM}`;
}

export function formatCardNumber(num) {
  return num.replace(/(.{4})/g, "$1 ").trim();
}
