"use client";

import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";

const OPTIONS = [
  { id: "lt2", emoji: "⏳", label: "<2 hours / week" },
  { id: "2-4", emoji: "⏰", label: "2-4 hours / week" },
  { id: "4-8", emoji: "⌚", label: "4-8 hours / week" },
  { id: "8+", emoji: "🗓️", label: ">8 hours / week" },
];

export default function Step12() {
  const { answers, setAnswer , goToStep } = useQuiz();

  const select = (id: string) => {
    setAnswer("hoursPerWeek", id);
    goToStep(13);
  };

  return (
    <div
      data-testid="step-time-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={10} />

        <div className="flex flex-col flex-grow justify-center items-center w-full">
          <span className="font-semibold text-[20px] leading-[26px] sm:text-[26px] sm:leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
            How many hours can you dedicate to&nbsp;a&nbsp;side&nbsp;project?
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-16">
            {OPTIONS.map((opt, i) => (
              <button
                key={opt.id}
                data-testid={`button-with-emoji${i + 1}`}
                onClick={() => select(opt.id)}
                className={`cursor-pointer rounded-xl flex flex-col justify-center items-center gap-6 px-4 pt-7 pb-[18px] transition-all duration-200 border-2 outline-none ${
                  answers.hoursPerWeek === opt.id
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
    </div>
  );
}
