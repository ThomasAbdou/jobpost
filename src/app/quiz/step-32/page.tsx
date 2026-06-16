"use client";

import { useEffect, useRef } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import ContinueButton from "@/components/ContinueButton";

function addDays(d: Date, n: number) {
  return new Date(d.getTime() + n * 86400000);
}
function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function Step32() {
  const { goToStep } = useQuiz();
  const lineRef = useRef<SVGPathElement>(null);

  // Animate chart line drawing in on mount
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      el.style.transition = "stroke-dashoffset 1.6s ease-out";
      el.style.strokeDashoffset = "0";
    });
  }, []);

  const today = new Date();
  const d1 = fmt(today);
  const d2 = fmt(addDays(today, 7));
  const d3 = fmt(addDays(today, 14));

  return (
    <div data-testid="step-graph-container" className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 justify-center items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <div className="flex flex-col flex-grow justify-around items-center w-full gap-3">

          {/* Header */}
          <div className="flex flex-col gap-3 text-center">
            <span className="font-bold text-[18px] leading-[22px] text-black text-center font-[Montserrat,sans-serif]">
              <span style={{ color: "rgb(13,169,94)" }}>4,172 open vacancies</span>{" "}for side projects fit&nbsp;your&nbsp;params
            </span>
            <span
              className="font-medium text-[13px] leading-[18px] text-center font-[Montserrat,sans-serif] whitespace-pre-wrap"
              style={{ color: "rgb(84,93,108)" }}
            >
              {`Available 4-8 hours / week\n1-2 years in Influencer or Blogger, Streamer\nOpen to global projects`}
            </span>
          </div>

          <span className="font-semibold text-[18px] leading-7 text-black font-[Montserrat,sans-serif]">
            Your personal schedule
          </span>

          {/* Chart */}
          <div className="relative w-full mt-4">
            {/* Price labels */}
            <div
              className="absolute flex justify-center items-center h-8 rounded-t-lg px-5"
              style={{ backgroundColor: "rgb(13,169,94)", top: "60%", left: "32%", transform: "translateY(-100%) translate(-100%)", zIndex: 1 }}
            >
              <span className="text-white font-medium text-[13px] leading-[14px] font-[Montserrat,sans-serif]">+$500/m</span>
            </div>
            <div
              className="absolute flex justify-center items-center h-8 rounded-t-lg px-5"
              style={{ backgroundColor: "rgb(13,169,94)", top: "18%", left: "64.5%", transform: "translateY(-100%) translate(-100%)", zIndex: 1 }}
            >
              <span className="text-white font-medium text-[13px] leading-[14px] font-[Montserrat,sans-serif]">+$1000/m</span>
            </div>

            {/* SVG Chart */}
            <svg width="664" height="184" viewBox="0 0 665 184" fill="none" style={{ width: "100%", height: "100%" }}>
              <path d="M1 32.2715H665" stroke="#E2E6EB" />
              <path d="M1 110.787H665" stroke="#E2E6EB" />
              <path d="M1 189.303H665" stroke="#E2E6EB" />
              <path
                opacity="0.1"
                d="M665 217.731V33.9634H429.141C428.675 33.9634 428.214 34.0446 427.776 34.2033L1 189.064V217.731H665Z"
                fill="url(#g0)"
              />
              <path
                ref={lineRef}
                d="M1 189.303L429.805 33.1336C430.243 32.9738 430.707 32.8921 431.174 32.8921H665"
                stroke="url(#g1)"
                strokeWidth="2"
              />
              <path d="M427.422 32.948L427.422 217.731" stroke="#C5DED2" />
              <path d="M212.18 112.141L212.18 217.731" stroke="#C5DED2" />
              <defs>
                <linearGradient id="g0" x1="664.999" y1="-46.2471" x2="-25.7804" y2="179.329" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0DA95E" />
                  <stop offset="0.359375" stopColor="#ACC802" />
                  <stop offset="0.697917" stopColor="#F2A45B" />
                  <stop offset="1" stopColor="#FF4E4E" />
                </linearGradient>
                <linearGradient id="g1" x1="665" y1="-46.2439" x2="-9.15243" y2="200.472" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0DA95E" />
                  <stop offset="0.359375" stopColor="#ACC802" />
                  <stop offset="0.697917" stopColor="#F2A45B" />
                  <stop offset="1" stopColor="#FF4E4E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Date labels */}
            <div className="absolute flex justify-between w-full" style={{ bottom: "-16px", transform: "translateY(100%)" }}>
              {[d1, d2, d3, "Later"].map((d) => (
                <span key={d} className="font-medium text-[10px] leading-[14px] font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>{d}</span>
              ))}
            </div>
          </div>

          {/* Feature boxes — icon on top, text below, centered */}
          <div className="flex justify-between gap-2 w-full mt-8">
            {[
              { emoji: "💎", text: <><strong>5 matches / week</strong> – you need to dedicate <strong>2 hours</strong> for it</>, flex: "1.5 1 0%" },
              { emoji: "🤝", text: <>1st contract expected by {d2}</>, flex: "1 1 0%" },
              { emoji: "🚀", text: <>2nd&nbsp;- by {d3}</>, flex: "1 1 0%" },
            ].map(({ emoji, text, flex }) => (
              <div key={emoji} className="flex flex-col items-center gap-4 text-center" style={{ flex }}>
                <div
                  className="flex-shrink-0 flex justify-center items-center w-12 h-12 rounded-xl"
                  style={{ backgroundColor: "rgb(240,243,251)" }}
                >
                  <span className="text-[24px] leading-[24px]">{emoji}</span>
                </div>
                <span className="font-medium text-[13px] leading-[18px] text-black font-[Montserrat,sans-serif]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <ContinueButton label="Continue" onClick={() => goToStep(33)} testId="next-button" />
        </div>
      </div>
    </div>
  );
}
