"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import RadioOption from "@/components/RadioOption";

const OPTIONS = [
  { id: "no_formal", label: "No formal education" },
  { id: "high_school", label: "High school" },
  { id: "associate", label: "Associate degree" },
  { id: "bachelor", label: "Bachelor's" },
  { id: "master", label: "Master's" },
  { id: "professional", label: "Professional degree (JD, MD, etc.)" },
  { id: "doctor", label: "Doctorate / PhD" },
];

export default function Step15() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.education ?? null);

  const choose = (id: string) => {
    setSelected(id);
    setAnswer("education", id);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={13} />
        <div className="flex-grow flex max-w-full" style={{ maxHeight: "calc(100dvh - 134px)" }}>
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]" style={{ margin: "56px 0 0" }}>
              What&apos;s your highest level of education?
            </span>
            <div className="flex flex-col gap-3 w-full max-w-[420px] py-10">
              {OPTIONS.map((o) => (
                <RadioOption key={o.id} id={o.id} label={o.label} checked={selected === o.id} onChange={choose} />
              ))}
            </div>
          </div>
        </div>
        <ContinueButton label="Next" disabled={!selected} onClick={() => selected && goToStep(16)} testId="next-button" />
      </div>
    </div>
  );
}
