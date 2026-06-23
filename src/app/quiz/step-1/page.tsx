"use client";

import { useQuiz } from "@/contexts/QuizContext";
import Image from "next/image";

const OPTIONS = [
  { id: "lt1", emoji: "👨‍💻", label: "<1 year of\u00a0experience" },
  { id: "1-2", emoji: "👔", label: "1-2 years of\u00a0experience" },
  { id: "3-5", emoji: "💼", label: "3-5 years of\u00a0experience" },
  { id: "6+", emoji: "👑", label: "6+ years of\u00a0experience" },
];

export default function Step1() {
  const { answers, setAnswer , goToStep } = useQuiz();

  const select = (id: string) => {
    setAnswer("experience", id);
    goToStep(2);
  };

  return (
    <div
      data-testid="step-experience-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      {/* Logo — centered on mobile, left on desktop */}
      <div className="w-full flex justify-center sm:justify-start px-5 sm:px-10 pt-4 shrink-0">
        <Image src="/remoteo3.png" alt="Logo" width={175} height={35} className="cursor-pointer" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-center items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 pb-[52px] pt-6">
        <p className="text-[16px] leading-6 font-medium text-black text-center whitespace-pre-line font-[Montserrat,sans-serif]">
          Due to the economic crisis, companies are switching to{" "}
          <strong className="font-semibold">part-time roles</strong> to reduce expenses. Let&apos;s{" "}
          <strong className="font-semibold">connect you</strong> to these{" "}
          <strong className="font-semibold">opportunities.</strong>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-8 sm:mt-16">
            {OPTIONS.map((opt, i) => (
              <button
                key={opt.id}
                data-testid={`button-with-emoji${i + 1}`}
                onClick={() => select(opt.id)}
                className={`cursor-pointer rounded-xl flex flex-col justify-center items-center gap-6 px-4 pt-7 pb-[18px] transition-all duration-200 border-2 outline-none ${
                  answers.experience === opt.id
                    ? "bg-white border-black shadow-lg"
                    : "bg-[#f5f7fd] border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <span className="h-[60px] text-[48px] leading-none flex items-center">{opt.emoji}</span>
                <span className="text-center text-xs leading-4 font-[Montserrat,sans-serif] font-medium text-black">
                  {opt.label}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
