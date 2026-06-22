"use client";

import { useState, useRef, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import Image from "next/image";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "ZZ", name: "Other", flag: "🌍" },
];

const TZ_TO_COUNTRY: Record<string, string> = {
  "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US",
  "America/Los_Angeles": "US", "America/Phoenix": "US", "America/Anchorage": "US",
  "America/Toronto": "CA", "America/Vancouver": "CA", "America/Winnipeg": "CA",
  "America/Sao_Paulo": "BR", "America/Argentina/Buenos_Aires": "AR", "America/Mexico_City": "MX",
  "Europe/London": "GB", "Europe/Paris": "FR", "Europe/Berlin": "DE",
  "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Amsterdam": "NL",
  "Europe/Zurich": "CH", "Europe/Stockholm": "SE", "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI", "Europe/Warsaw": "PL",
  "Europe/Lisbon": "PT", "Europe/Athens": "GR", "Europe/Vienna": "AT",
  "Europe/Brussels": "BE", "Europe/Prague": "CZ", "Europe/Kyiv": "UA",
  "Europe/Kiev": "UA", "Europe/Moscow": "RU",
  "Asia/Dubai": "AE", "Asia/Riyadh": "SA", "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR", "Asia/Singapore": "SG", "Asia/Kolkata": "IN",
  "Asia/Karachi": "PK", "Asia/Bangkok": "TH", "Asia/Ho_Chi_Minh": "VN",
  "Asia/Jakarta": "ID", "Asia/Kuala_Lumpur": "MY", "Asia/Manila": "PH",
  "Asia/Jerusalem": "IL", "Asia/Shanghai": "CN", "Asia/Hong_Kong": "SG",
  "Africa/Johannesburg": "ZA", "Africa/Lagos": "NG", "Africa/Cairo": "EG",
  "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Perth": "AU",
  "Pacific/Auckland": "NZ",
};

function getDefaultCountry() {
  const tz = typeof window !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "";
  const code = TZ_TO_COUNTRY[tz] ?? "US";
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES.find((c) => c.code === "US")!;
}

export default function Step9() {
  const { answers, setAnswer , goToStep } = useQuiz();

  const [selected, setSelected] = useState(() =>
    COUNTRIES.find((c) => c.name === answers.country) ?? getDefaultCountry()
  );
  const [query, setQuery] = useState(() =>
    (COUNTRIES.find((c) => c.name === answers.country) ?? getDefaultCountry()).name
  );
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selected.name);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [selected]);

  const choose = (c: typeof COUNTRIES[0]) => {
    setSelected(c);
    setQuery(c.name);
    setAnswer("country", c.name);
    setAnswer("countryFlag", c.flag);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      {/* Header — logo only */}
      <div className="flex justify-between items-end w-full mt-4 mb-2.5 px-5 sm:px-10 absolute top-0 left-0 right-0 z-10">
        <Image src="/remoteo3.png" alt="Logo" width={175} height={35} className="cursor-pointer" />
        <div />
      </div>

      <div className="w-full h-[58px]" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-3 mb-[52px]">
        {/* Bar without "Profile" label */}
        <SegmentedProgressBar filledCount={8} showLabel={false} />

        {/* Centered content block */}
        <div className="flex flex-col flex-1 justify-center items-center w-full max-w-[400px]">
          <span
            className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif] w-full"
            style={{ marginBottom: 40 }}
          >
            Where are you currently based?
          </span>

          {/* Country dropdown */}
          <div className="relative w-full" ref={containerRef}>
            <div
              className="flex items-center gap-2 w-full rounded-xl px-4 transition-all"
              style={{
                border: `1px solid ${open ? "rgb(73,89,220)" : "rgb(226,230,235)"}`,
                height: 40,
                backgroundColor: "rgb(249,250,252)",
              }}
            >
              <span className="flex-shrink-0 text-[1em] leading-none">{selected.flag}</span>
              <input
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => { setOpen(true); setQuery(""); }}
                className="flex-1 min-w-0 bg-transparent outline-none text-[13px] leading-5 font-medium text-black font-[Montserrat,sans-serif]"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => { setOpen((o) => !o); setQuery(""); }}
                className="flex-shrink-0 flex items-center p-1"
                style={{ color: "rgb(145,156,173)" }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                </svg>
              </button>
            </div>

            {open && filtered.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-y-auto z-50 shadow-lg"
                style={{ maxHeight: 240, backgroundColor: "white", border: "1px solid rgb(226,230,235)" }}
              >
                {filtered.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => choose(c)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-[#f5f7fd] transition-colors"
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-[13px] font-medium text-black font-[Montserrat,sans-serif]">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span
            className="text-[14px] font-medium leading-[22px] text-center font-[Montserrat,sans-serif]"
            style={{ color: "rgb(129,143,164)", marginTop: 24 }}
          >
            If you&apos;re a digital nomad, choose your tax residence.
          </span>
        </div>

        <ContinueButton
          label="Next"
          onClick={() => goToStep(10)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
