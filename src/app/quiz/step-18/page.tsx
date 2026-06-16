"use client";

import { useQuiz } from "@/contexts/QuizContext";

import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

export default function Step18() {
  const { goToStep } = useQuiz();

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 justify-between items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={16} />

        <div className="flex flex-col items-center gap-7">
          {/* Illustration */}
          <div
            className="w-[135px] h-[135px] rounded-2xl flex items-center justify-center text-[72px]"
            style={{ backgroundColor: "rgb(245,247,253)" }}
          >
            🤓
          </div>

          <div className="flex flex-col items-center gap-6">
            <span className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]" style={{ margin: 0 }}>
              A smart move in today&apos;s market
            </span>
            <span className="text-[14px] font-medium leading-[22px] text-center font-[Montserrat,sans-serif]" style={{ color: "rgb(84,93,108)", margin: 0 }}>
              You&apos;re a match for thousands of remote roles; flexibility can{" "}
              <strong className="font-bold">double your options.</strong>
            </span>
          </div>
        </div>

        <div className="flex gap-3 w-full max-w-[327px]">
          <ContinueButton label="Next" onClick={() => goToStep(19)} testId="next-button" />
        </div>
      </div>
    </div>
  );
}
