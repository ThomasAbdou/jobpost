"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import RadioOption from "@/components/RadioOption";

const OPTIONS = [
  { id: "less_year", label: "Less than a year ago" },
  { id: "1_3_years", label: "1-3 years ago" },
  { id: "over_3_years", label: "Over 3 years ago" },
  { id: "no_change", label: "I haven't changed job yet" },
  { id: "first_job", label: "I'm looking for my first job" },
];

export default function Step19() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [selected, setSelected] = useState<string | null>(answers.lastRoleChange ?? null);

  const choose = (id: string) => { setSelected(id); setAnswer("lastRoleChange", id); };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={17} />
        <div className="flex-grow flex max-w-full" style={{ maxHeight: "calc(100dvh - 134px)" }}>
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]" style={{ margin: "56px 0 0" }}>
              Your last role change was...
            </span>
            <div className="flex flex-col gap-3 w-full max-w-[420px] py-10">
              {OPTIONS.map((o) => (
                <RadioOption key={o.id} id={o.id} label={o.label} checked={selected === o.id} onChange={choose} />
              ))}
            </div>
          </div>
        </div>
        <ContinueButton label="Next" disabled={!selected} onClick={() => selected && goToStep(20)} testId="next-button" />
      </div>
    </div>
  );
}
