"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import CheckboxOption from "@/components/CheckboxOption";

const VALUES = [
  { id: "no_commute", label: "No commute" },
  { id: "flexible_schedule", label: "Flexible schedule" },
  { id: "more_opportunities", label: "More opportunities across markets" },
  { id: "work_from_anywhere", label: "Work from anywhere" },
  { id: "better_for_family", label: "Better for family or personal needs" },
];

export default function Step8() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [checked, setChecked] = useState<Set<string>>(
    new Set(answers.remoteValues ?? [])
  );

  const toggle = (id: string, isChecked: boolean) => {
    const next = new Set(checked);
    if (isChecked) next.add(id);
    else next.delete(id);
    setChecked(next);
    setAnswer("remoteValues", Array.from(next));
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={7} />

        <div
          className="flex-grow flex max-w-full"
          style={{ maxHeight: "calc(100dvh - 160px)" }}
        >
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <span
              className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]"
              style={{ margin: "56px 0 0" }}
            >
              What do you value most about remote work?
            </span>

            <div className="flex flex-col gap-3 w-full max-w-[420px] py-10">
              {VALUES.map((v) => (
                <CheckboxOption
                  key={v.id}
                  id={v.id}
                  label={v.label}
                  checked={checked.has(v.id)}
                  onChange={toggle}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <ContinueButton
              label="Next"
              disabled={checked.size === 0}
              onClick={() => checked.size > 0 && goToStep(9)}
              testId="next-button"
            />
        </div>
      </div>
    </div>
  );
}
