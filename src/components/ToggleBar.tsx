"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLocale, type Locale } from "@/context/LocaleContext";

function SunIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// UK flag SVG
function FlagUK() {
  return (
    <svg
      className="w-5 h-3.5 rounded-[1px] object-cover"
      viewBox="0 0 60 40"
      aria-label="English"
    >
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

// Sun ray endpoints precomputed to avoid server/client floating-point mismatch
const UY_RAYS: [string, string, string, string][] = [
  ["17.5",   "11",      "20",      "11"     ], // 0°
  ["15.889", "14.889", "17.657", "16.657"], // 45°
  ["12",     "16.5",   "12",      "19"     ], // 90°
  ["8.111",  "14.889", "6.343",  "16.657"], // 135°
  ["6.5",    "11",      "4",       "11"     ], // 180°
  ["8.111",  "7.111",  "6.343",  "5.343" ], // 225°
  ["12",     "5.5",    "12",      "3"      ], // 270°
  ["15.889", "7.111",  "17.657", "5.343" ], // 315°
];

// Uruguay flag SVG (simplified: white+blue stripes + sun canton)
function FlagUY() {
  return (
    <svg
      className="w-5 h-3.5 rounded-[1px] object-cover"
      viewBox="0 0 60 40"
      aria-label="Español"
    >
      <rect width="60" height="40" fill="#fff" />
      {/* Blue horizontal stripes (4 of 9 stripes, alternating) */}
      <rect y="4.4" width="60" height="4.4" fill="#75AADB" />
      <rect y="13.2" width="60" height="4.4" fill="#75AADB" />
      <rect y="22" width="60" height="4.4" fill="#75AADB" />
      <rect y="30.8" width="60" height="4.4" fill="#75AADB" />
      {/* White canton */}
      <rect width="24" height="22" fill="#fff" />
      {/* Sun */}
      <circle cx="12" cy="11" r="5" fill="#F6C500" />
      <circle cx="12" cy="11" r="2" fill="#F6C500" />
      {UY_RAYS.map(([x1, y1, x2, y2]) => (
        <line key={`ray-${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F6C500" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export default function ToggleBar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="p-1.5 text-muted hover:text-foreground transition-colors duration-300"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Locale divider */}
      <span className="w-px h-4 bg-border" />

      {/* Locale toggle */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLocale("en" as Locale)}
          className={`p-1 transition-all duration-300 rounded-[1px] ${
            locale === "en" ? "opacity-100 ring-1 ring-accent/50" : "opacity-40 hover:opacity-70"
          }`}
          aria-label="Switch to English"
          title="English"
        >
          <FlagUK />
        </button>
        <button
          onClick={() => setLocale("es" as Locale)}
          className={`p-1 transition-all duration-300 rounded-[1px] ${
            locale === "es" ? "opacity-100 ring-1 ring-accent/50" : "opacity-40 hover:opacity-70"
          }`}
          aria-label="Cambiar a Español"
          title="Español"
        >
          <FlagUY />
        </button>
      </div>
    </div>
  );
}
