"use client";

import { useQuiz } from "@/contexts/QuizContext";

import ContinueButton from "@/components/ContinueButton";

export default function Step30() {
  const { goToStep } = useQuiz();

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 justify-center items-center w-full mx-auto px-4 sm:px-6 mt-2 mb-2">
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Congrats illustration */}
          <div className="text-[80px] leading-none select-none">🎉</div>

          <div className="flex flex-col items-center gap-5">
            <span
              className="font-medium text-[16px] leading-[22px] font-[Montserrat,sans-serif]"
              style={{ color: "rgb(84,93,108)", margin: 0 }}
            >
              All set!
            </span>
            <span
              className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif] whitespace-pre"
              style={{ margin: 0 }}
            >
              We found{" "}
              <span
                className="font-semibold text-[24px] leading-8 text-white rounded-lg"
                style={{
                  backgroundColor: "rgb(55,194,105)",
                  padding: "4px 8px",
                }}
              >
                4,172 jobs
              </span>
              {"\n"}that match your profile
            </span>
          </div>
        </div>

        <div className="mt-8">
          <ContinueButton label="Next" onClick={() => goToStep(31)} testId="next-button" />
        </div>
      </div>
    </div>
  );
}
