"use client";

import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

export default function Step11() {
  const { answers, goToStep } = useQuiz();
  const isYes = answers.usAuth === "yes";

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-8">
        <SegmentedProgressBar filledCount={9} />

        <div className="flex flex-col flex-1 justify-center items-center gap-7">
          <div
            className="w-[135px] h-[135px] rounded-full flex items-center justify-center text-[80px]"
            style={{ backgroundColor: isYes ? "#e9ffed" : "#f0f4ff" }}
          >
            {isYes ? "🇺🇸" : "🌍"}
          </div>

          <div className="flex flex-col items-center gap-6">
            <span
              className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]"
              style={{ margin: 0 }}
            >
              {isYes ? "Awesome!" : "All good"}
            </span>
            <span
              className="text-[14px] font-medium leading-[22px] text-center font-[Montserrat,sans-serif]"
              style={{ color: "rgb(84,93,108)", margin: 0 }}
            >
              {isYes ? (
                <>
                  You&apos;re eligible for{" "}
                  <strong className="font-bold">all remote jobs from US employers.</strong>{" "}
                  We&apos;ll show you all available remote jobs from US companies.
                </>
              ) : (
                "Many jobs don't need US work authorization. We'll surface the best fits."
              )}
            </span>
          </div>
        </div>

        <ContinueButton
          label="Next"
          onClick={() => goToStep(12)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
