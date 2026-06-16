"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import RadioOption from "@/components/RadioOption";

const OPTIONS = [
  { id: "entry", label: "Entry" },
  { id: "junior", label: "Junior (<2 years)" },
  { id: "middle", label: "Mid-level (2-5 years)" },
  { id: "senior", label: "Senior (5+ years)" },
  { id: "lead", label: "Lead / Manager" },
  { id: "director", label: "Director" },
  { id: "c_level", label: "VP / C-level" },
];

export default function Step16() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.professionalLevel ?? null);

  const choose = (id: string) => { setSelected(id); setAnswer("professionalLevel", id); };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white overflow-hidden">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 min-h-0 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={14} />
        <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif] mt-6 mb-4">
          What&apos;s your current professional level?
        </span>
        <div className="flex flex-col gap-3 w-full max-w-[420px] overflow-y-auto flex-1 min-h-0 py-1">
          {OPTIONS.map((o) => (
            <RadioOption key={o.id} id={o.id} label={o.label} checked={selected === o.id} onChange={choose} />
          ))}
        </div>
        <div className="pt-4 w-full">
          <ContinueButton label="Next" disabled={!selected} onClick={() => selected && goToStep(17)} testId="next-button" />
        </div>
      </div>
    </div>
  );
}
