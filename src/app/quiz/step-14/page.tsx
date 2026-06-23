"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const EXPERTISE = [
  { id: "data_entry", label: "🖥️ Data Entry" },
  { id: "medical", label: "🩺 Medical" },
  { id: "translation", label: "🌐 Translation" },
  { id: "copywriting", label: "🖋️ Copywriting" },
  { id: "assistant", label: "📋 Assistant" },
  { id: "customer_service", label: "💬 Customer Service" },
  { id: "call_center", label: "📞 Call Center" },
  { id: "marketing", label: "💸 Marketing" },
  { id: "it", label: "✔️ IT" },
  { id: "entertainment", label: "🎥 Entertainment" },
  { id: "education", label: "🧮 Education" },
  { id: "investor_vc", label: "💰 Investor & VC" },
  { id: "finance", label: "🏦 Finance" },
  { id: "consulting", label: "🧨 Consulting" },
  { id: "engineer", label: "🧑‍🔬 Engineer" },
  { id: "hr", label: "🗿 HR" },
  { id: "business_owner", label: "✨ Business Owner" },
  { id: "c_level", label: "🧑‍💼 C-level Executive" },
  { id: "sales_bizdev", label: "👍 Sales & BizDev" },
  { id: "startup_founder", label: "🔥 Startup Founder" },
  { id: "student", label: "🎓 Student" },
  { id: "legal", label: "⚖️ Legal" },
  { id: "sports", label: "🏐 Sports" },
  { id: "design", label: "🐦 Design" },
  { id: "influencer", label: "📝 Influencer or Blogger" },
];

export default function Step14() {
  const { answers, setAnswer, goToStep } = useQuiz();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(answers.expertise ?? [])
  );

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    setAnswer("expertise", Array.from(next));
  };

  return (
    <div
      data-testid="step-expertise-container"
      className="flex flex-col items-center w-full h-full bg-white overflow-hidden"
    >
      <div className="w-full h-3 shrink-0" />

      <div className="flex flex-col flex-1 min-h-0 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2">
        <SegmentedProgressBar filledCount={12} />

        <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif] mt-8 shrink-0">
          Select your areas of expertise
        </span>

        <div className="flex flex-wrap justify-center gap-2 mt-6 w-full flex-1 min-h-0 overflow-y-auto content-start pb-4">
          {EXPERTISE.map((item, i) => {
            const isSelected = selected.has(item.id);
            return (
              <button
                key={item.id}
                data-testid={`industry_index_${i}`}
                onClick={() => toggle(item.id)}
                className="flex justify-center items-center rounded-lg h-[34px] px-7 transition-all duration-200 cursor-pointer shrink-0"
                style={{
                  backgroundColor: isSelected ? "rgb(28,28,113)" : "rgb(245,247,253)",
                  color: isSelected ? "white" : "rgb(105,135,215)",
                }}
              >
                <span className="font-medium text-[13px] leading-[18px] font-[Montserrat,sans-serif]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <ContinueButton
          label="Next"
          disabled={selected.size === 0}
          onClick={() => selected.size > 0 && goToStep(15)}
        />
      </div>
    </div>
  );
}
