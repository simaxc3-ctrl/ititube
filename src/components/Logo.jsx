import React, { useId } from "react";
import { C } from "../theme.js";

export default function Logo({ size = 40 }) {
  const gradId = `ititube-logo-grad-${useId()}`;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={C.blue} />
          <stop offset="1" stopColor={C.accent} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill={`url(#${gradId})`} />
      <path
        d="M48 41 L86 60 L48 79 Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="9"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
