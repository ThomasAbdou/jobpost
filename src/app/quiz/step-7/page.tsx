"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import CheckboxOption from "@/components/CheckboxOption";

const ROLES = [
  { id: "remote", label: "Fully remote" },
  { id: "onsite", label: "On-site" },
  { id: "hybrid", label: "Hybrid" },
];

export default function Step7() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [checked, setChecked] = useState<Set<string>>(
    new Set(answers.roleTypes ?? [])
  );

  const toggle = (id: string, isChecked: boolean) => {
    const next = new Set(checked);
    if (isChecked) next.add(id);
    else next.delete(id);
    setChecked(next);
    setAnswer("roleTypes", Array.from(next));
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={6} />

        <div
          className="flex-grow flex max-w-full"
          style={{ maxHeight: "calc(100dvh - 160px)" }}
        >
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <span
              className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]"
              style={{ margin: "56px 0 0" }}
            >
              What kind of roles are you looking for?
            </span>

            <div className="flex flex-col gap-3 w-full max-w-[420px] py-10">
              {ROLES.map((r) => (
                <CheckboxOption
                  key={r.id}
                  id={r.id}
                  label={r.label}
                  checked={checked.has(r.id)}
                  onChange={toggle}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-4">
            <ContinueButton
              label="Next"
              disabled={checked.size === 0}
              onClick={() => checked.size > 0 && goToStep(8)}
              testId="next-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
