"use client";

import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const EXPERIENCE_MESSAGES: Record<string, { highlight: string; body: string }> = {
  lt1: {
    highlight: "less than 1 year",
    body: "of experience is a great starting point; our data shows growing demand for entry-level talent on short-term projects. We're delighted to have you on board — answer a few more questions and we'll",
  },
  "1-2": {
    highlight: "1-2 years",
    body: "of experience is in the sweet spot; our data shows high demand from companies seeking part-timers for side projects. We're delighted to have you on board — answer a few more questions and we'll",
  },
  "3-5": {
    highlight: "3-5 years",
    body: "of experience makes you highly valuable; our data shows companies actively seek part-timers with your depth of expertise. We're delighted to have you on board — answer a few more questions and we'll",
  },
  "6+": {
    highlight: "6+ years",
    body: "of experience puts you in elite territory; our data shows premium demand for senior part-timers on high-impact projects. We're thrilled to have you on board — answer a few more questions and we'll",
  },
};

export default function Step2() {
  const { answers , goToStep } = useQuiz();
  const msg = EXPERIENCE_MESSAGES[answers.experience ?? "1-2"] ?? EXPERIENCE_MESSAGES["1-2"];

  return (
    <div
      data-testid="step-note1-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      {/* Empty header spacer */}
      <div className="w-full h-3" />

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        {/* Progress bar */}
        <SegmentedProgressBar filledCount={1} />

        {/* Content grows */}
        <div
          className="flex-grow flex max-w-full"
          style={{ maxHeight: "calc(100dvh - 134px)" }}
        >
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            {/* Avatar */}
            <img
              src="https://d1cg29ukvkl76a.cloudfront.net/web/images/faces/face1.webp"
              alt="Advisor"
              width={142}
              height={157}
              className="w-[142px] h-[157px]"
            />

            {/* Text */}
            <div className="flex flex-col gap-3 max-w-full mt-10">
              <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
                Yay, glad you&apos;re here!
              </span>
              <span className="font-medium text-[14px] leading-6 text-center font-[Montserrat,sans-serif] whitespace-pre-wrap" style={{ color: "rgb(84,93,108)" }}>
                Your{" "}
                <strong className="font-bold">{msg.highlight}</strong>{" "}
                {msg.body}{" "}
                <strong className="font-bold">connect you</strong> with these eager{" "}
                <strong className="font-bold">businesses.</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Button */}
        <ContinueButton
          label="Continue"
          onClick={() => goToStep(3)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
