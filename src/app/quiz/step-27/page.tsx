"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const REACTIONS = [
  { id: "no", emoji: "👎" },
  { id: "neutral", emoji: "🤷‍♂️" },
  { id: "yes", emoji: "👍" },
];

export default function Step27() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.personality2 ?? null);

  const choose = (id: string) => { setSelected(id); setAnswer("personality2", id); };

  return (
    <div
      data-testid="step-questions2-container"
      className="flex flex-col items-center w-full"
      style={{ minHeight: "100dvh", maxHeight: "100dvh", backgroundColor: "rgb(255,255,255)" }}
    >
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={25} />
        <div className="flex-grow flex max-w-full" style={{ maxHeight: "calc(100dvh - 140px)" }}>
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <span className="font-semibold text-[14px] leading-4 font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>
              How much does this fit you?
            </span>
            <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif] mt-6">
              I want remote projects from anywhere in the world
            </span>

            <div className="flex flex-col items-center w-full max-w-full mt-10 relative">
              <div className="flex gap-3 w-full max-w-full">
                {REACTIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => choose(r.id)}
                    className="flex-1 flex flex-col justify-center items-center rounded-xl gap-3 py-[22px] cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: selected === r.id ? "rgb(73,89,220)" : "rgb(245,247,253)",
                      border: "none",
                    }}
                  >
                    <span className="text-[32px]">{r.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ContinueButton label="Next" disabled={!selected} onClick={() => selected && goToStep(28)} testId="next-button" />
      </div>
    </div>
  );
}
