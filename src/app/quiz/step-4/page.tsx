"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const OPTIONS = [
  { id: "lt500",     emoji: "🪙", label: "Less than $500" },
  { id: "500-1500",  emoji: "💵", label: "$500–$1,500" },
  { id: "1500-5000", emoji: "💸", label: "$1,500–$5,000" },
  { id: "5000+",     emoji: "💰", label: "More than $5,000" },
];

export default function Step4() {
  const { answers, setAnswer, goToStep } = useQuiz();
  const [selectedIdx, setSelectedIdx] = useState<number>(() => {
    const idx = OPTIONS.findIndex((o) => o.id === answers.earnings);
    return idx >= 0 ? idx : 0;
  });

  const select = (idx: number) => {
    setSelectedIdx(idx);
    setAnswer("earnings", OPTIONS[idx].id);
  };

  const fillPct = selectedIdx === 0 ? 0 : (selectedIdx / (OPTIONS.length - 1)) * 100;

  return (
    <div
      data-testid="step-selector-container"
      className="flex flex-col items-center w-full h-full bg-white overflow-hidden"
    >
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 min-h-0 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={3} />

        <div className="flex flex-col flex-1 justify-center items-center gap-10 w-full py-4">
          <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif] px-5">
            What monthly earnings do you expect to achieve from side projects?
          </span>

          {/* ── DESKTOP: horizontal slider ── */}
          <div className="hidden sm:flex flex-col w-full">
            <div className="flex flex-col items-center w-full px-[calc(12.5%-14px)]">
              <div className="relative flex items-center w-full h-7 overflow-hidden">
                <div className="absolute w-full h-2 rounded-full" style={{ backgroundColor: "rgb(240,243,251)" }} />
                <div
                  className="absolute h-2 rounded-full transition-all duration-300"
                  style={{ backgroundColor: "rgb(28,28,113)", width: `${fillPct}%`, left: 0 }}
                />
                <div className="relative w-full flex justify-between items-center" style={{ zIndex: 2 }}>
                  {OPTIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => select(i)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: i <= selectedIdx ? "rgb(28,28,113)" : "rgb(240,243,251)" }}
                    >
                      {i === selectedIdx && <div className="w-3 h-3 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start w-full mt-5">
              {OPTIONS.map((opt, i) => (
                <button key={opt.id} onClick={() => select(i)} className="flex flex-col justify-center items-center w-1/4 cursor-pointer">
                  <span className="text-[26px] leading-[31px] text-center">{opt.emoji}</span>
                  <span
                    className="text-[14px] leading-6 font-medium text-center font-[Montserrat,sans-serif] whitespace-pre-wrap mt-1"
                    style={{ color: i === selectedIdx ? "rgb(0,0,0)" : "rgb(105,135,215)" }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── MOBILE: vertical slider ── */}
          <div className="flex sm:hidden items-start gap-5 w-full max-w-[320px]">
            {/* Track + dots */}
            <div className="flex flex-col items-center pt-1" style={{ width: 28 }}>
              {[...OPTIONS].reverse().map((_, ri) => {
                const i = OPTIONS.length - 1 - ri;
                const isSelected = i === selectedIdx;
                const isFilled = i <= selectedIdx;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <button
                      onClick={() => select(i)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: isFilled ? "rgb(105,135,215)" : "rgb(240,243,251)",
                        border: isSelected ? "3px solid white" : "none",
                        outline: isSelected ? "2px solid rgb(105,135,215)" : "none",
                      }}
                    />
                    {ri < OPTIONS.length - 1 && (
                      <div
                        className="w-[3px] transition-all duration-300"
                        style={{
                          height: 60,
                          backgroundColor: i < selectedIdx ? "rgb(105,135,215)" : "rgb(226,230,235)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex flex-col" style={{ gap: 0 }}>
              {[...OPTIONS].reverse().map((opt, ri) => {
                const i = OPTIONS.length - 1 - ri;
                const isSelected = i === selectedIdx;
                return (
                  <button
                    key={opt.id}
                    onClick={() => select(i)}
                    className="flex items-center gap-3 text-left"
                    style={{ height: ri < OPTIONS.length - 1 ? 87 : 28, paddingTop: 4 }}
                  >
                    <span className="text-[22px]">{opt.emoji}</span>
                    <span
                      className="font-medium text-[15px] leading-5 font-[Montserrat,sans-serif]"
                      style={{ color: isSelected ? "rgb(0,0,0)" : "rgb(105,135,215)" }}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <ContinueButton label="Next" onClick={() => goToStep(5)} testId="next-button" />
      </div>
    </div>
  );
}
