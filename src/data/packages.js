import { C } from "../theme.js";

export const PACKAGES = [
  { id: "standard", price: 120000, color: C.ink },
  { id: "pro", price: 250000, color: C.accent, badge: true },
  { id: "express", price: 350000, color: C.blueDark },
];

export const PKG_KEYS = {
  standard: ["pkgStandardName", "pkgStandardDesc"],
  pro: ["pkgProName", "pkgProDesc"],
  express: ["pkgExpressName", "pkgExpressDesc"],
};

export const STATUS_COLORS = {
  queued: { bg: "#F2F1F5", fg: C.inkSoft },
  progress: { bg: "#FFF4E0", fg: "#B9790A" },
  ready: { bg: "#E7F0FF", fg: C.blueDark },
  delivered: { bg: C.successBg, fg: C.success },
};

export const STATUS_KEYS = {
  queued: "stQueued",
  progress: "stProgress",
  ready: "stReady",
  delivered: "stDelivered",
};
