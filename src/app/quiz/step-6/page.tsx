"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const MOTIVATIONS = [
  { id: "extra_income", label: "Extra income", emoji: "💰" },
  { id: "work_life_balance", label: "Improve work-life balance", emoji: "💼" },
  { id: "layoff_protection", label: "Gain protection from layoffs", emoji: "🌱" },
  { id: "remote_transition", label: "Transition to remote work", emoji: "🤝" },
  { id: "relocate", label: "Relocate to a new place", emoji: "👑" },
  { id: "new_skills", label: "Develop new skills", emoji: "🧑‍🎓" },
];

export default function Step6() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.motivation ?? null);

  const toggle = (id: string) => {
    const next = selected === id ? null : id;
    setSelected(next);
    if (next) setAnswer("motivation", next);
  };

  return (
    <div
      data-testid="step-motivations-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={5} />

        <div className="flex flex-col flex-1 justify-center items-center gap-5 w-full py-4">
          <span className="font-semibold text-[22px] sm:text-[26px] leading-[28px] sm:leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
            Do you have a specific reason for exploring side&nbsp;projects?
          </span>

          <div className="flex flex-col gap-3 w-full">
            {MOTIVATIONS.map((m, i) => (
              <button
                key={m.id}
                data-testid={`list-item_index_${i}`}
                onClick={() => toggle(m.id)}
                className="flex justify-between items-center rounded-xl px-4 py-[13px] transition-all duration-200 cursor-pointer w-full"
                style={{
                  backgroundColor: selected === m.id ? "rgb(220,225,255)" : "rgb(245,247,253)",
                  border: selected === m.id ? "2px solid rgb(73,89,220)" : "2px solid transparent",
                }}
              >
                <span className="font-medium text-[14px] leading-[20px] text-black font-[Montserrat,sans-serif]">
                  {m.label}
                </span>
                <span className="text-[22px]">{m.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        <ContinueButton
          label="Next"
          disabled={!selected}
          onClick={() => selected && goToStep(7)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
