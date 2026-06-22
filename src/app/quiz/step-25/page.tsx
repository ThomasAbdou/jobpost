"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";
import CheckboxOption from "@/components/CheckboxOption";

const BENEFITS = [
  { id: "flexible_pto", label: "Flexible paid time off" },
  { id: "health_coverage", label: "Health coverage" },
  { id: "parental_leave", label: "Parental leave" },
  { id: "career_growth", label: "Career growth opportunities" },
  { id: "international", label: "International opportunities" },
  { id: "equipment", label: "Company-provided equipment" },
  { id: "home_office", label: "Home office budget" },
  { id: "event_expenses", label: "Event expenses covered" },
  { id: "learning", label: "Learning expenses coverage" },
  { id: "wellness", label: "Wellness programs" },
  { id: "mental_health", label: "Mental-health support" },
];

export default function Step25() {
  const { answers, setAnswer , goToStep } = useQuiz();
  const [checked, setChecked] = useState<Set<string>>(new Set(answers.benefits ?? []));

  const toggle = (id: string, isChecked: boolean) => {
    const next = new Set(checked);
    if (isChecked) next.add(id); else next.delete(id);
    setChecked(next);
    setAnswer("benefits", Array.from(next));
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white overflow-hidden">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 min-h-0 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={23} />
        <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif] mt-10 mb-[52px]">
          Pick the benefits you value most
        </span>
        <div className="flex flex-col gap-3 w-full max-w-[420px] overflow-y-auto flex-1 min-h-0 py-1">
          {BENEFITS.map((b) => (
            <CheckboxOption key={b.id} id={b.id} label={b.label} checked={checked.has(b.id)} onChange={toggle} />
          ))}
        </div>
        <ContinueButton label="Next" disabled={checked.size === 0} onClick={() => checked.size > 0 && goToStep(26)} testId="next-button" />
      </div>
    </div>
  );
}
