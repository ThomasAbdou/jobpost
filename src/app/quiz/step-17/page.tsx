"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import RadioOption from "@/components/RadioOption";

const OPTIONS = [
  { id: "yes", label: "Yes, if needed" },
  { id: "maybe", label: "Maybe, if it's a strong fit" },
  { id: "no", label: "No, I'm open to only my level or above" },
];

export default function Step17() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.lowerLevelRole ?? null);

  const choose = (id: string) => { setSelected(id); setAnswer("lowerLevelRole", id); };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white overflow-hidden">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 min-h-0 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-8">
        <SegmentedProgressBar filledCount={15} />
        <div className="flex flex-col flex-1 justify-center items-center w-full gap-6">
          <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]">
            Would you consider a lower-level role?
          </span>
          <div className="flex flex-col gap-3 w-full max-w-[420px]">
            {OPTIONS.map((o) => (
              <RadioOption key={o.id} id={o.id} label={o.label} checked={selected === o.id} onChange={choose} />
            ))}
          </div>
        </div>
        <ContinueButton label="Next" disabled={!selected} onClick={() => selected && goToStep(18)} testId="next-button" />
      </div>
    </div>
  );
}
