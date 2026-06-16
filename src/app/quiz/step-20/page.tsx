"use client";

import { useQuiz } from "@/contexts/QuizContext";

import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

export default function Step20() {
  const { goToStep } = useQuiz();

  return (
    <div
      data-testid="step-note4-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={18} />
        <div className="flex-grow flex max-w-full" style={{ maxHeight: "calc(100dvh - 134px)" }}>
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <img
              src="https://d1cg29ukvkl76a.cloudfront.net/web/images/faces/face6.webp"
              alt="Advisor"
              width={142}
              height={157}
              className="w-[142px] h-[157px]"
            />
            <div className="flex flex-col gap-3 max-w-full mt-10">
              <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
                Noted!
              </span>
              <span
                className="font-medium text-[14px] leading-6 text-center font-[Montserrat,sans-serif] whitespace-pre-wrap"
                style={{ color: "rgb(84,93,108)" }}
              >
                We&apos;ve <strong className="font-bold">acknowledged</strong> your{" "}
                <strong className="font-bold">areas of expertise.</strong> Next, let&apos;s{" "}
                <strong className="font-bold">explore work</strong> and{" "}
                <strong className="font-bold">communication</strong> styles that align with your{" "}
                <strong className="font-bold">preferences</strong> to find the{" "}
                <strong className="font-bold">perfect part-time</strong> job matches for you.
              </span>
            </div>
          </div>
        </div>
        <ContinueButton label="Next" onClick={() => goToStep(21)} testId="next-button" />
      </div>
    </div>
  );
}
