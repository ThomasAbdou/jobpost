"use client";

import { useQuiz } from "@/contexts/QuizContext";

import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

export default function Step5() {
  const { goToStep } = useQuiz();

  return (
    <div
      data-testid="step-note2-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={4} />

        <div
          className="flex-grow flex max-w-full"
          style={{ maxHeight: "calc(100dvh - 134px)" }}
        >
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <img
              src="https://d1cg29ukvkl76a.cloudfront.net/web/images/faces/face4.webp"
              alt="Advisor"
              width={142}
              height={157}
              className="w-[142px] h-[157px]"
            />
            <div className="flex flex-col gap-3 max-w-full mt-10">
              <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
                Thanks for being honest!
              </span>
              <span
                className="font-medium text-[14px] leading-6 text-center font-[Montserrat,sans-serif] whitespace-pre-wrap"
                style={{ color: "rgb(84,93,108)" }}
              >
                Now, let&apos;s dive into your personality and expertise to find the perfect part-time
                opportunities for you
              </span>
            </div>
          </div>
        </div>

        <ContinueButton
          label="Next"
          onClick={() => goToStep(6)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
