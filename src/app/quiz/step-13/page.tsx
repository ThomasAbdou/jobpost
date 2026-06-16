"use client";

import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

const HOUR_MESSAGES: Record<string, { title: string; body: string }> = {
  lt2: {
    title: "Quick insights",
    body: "Devoting less than 2 hours weekly opens up quick advisory calls where you share high-impact insights and advice. You'll connect with businesses that need your expertise in just a short session.",
  },
  "2-4": {
    title: "Advisory roles",
    body: "Devoting 2-4 hours weekly unlocks advisory roles for you, entailing regular calls to guide businesses in need of your expertise. You'll help them solve specific challenges and move forward with confidence.",
  },
  "4-8": {
    title: "Consulting projects",
    body: "Devoting 4-8 hours weekly unlocks consulting projects for you, entailing 1-2 calls to mentor businesses in need of your domain expertise, yet equipped to take action. You'll assess their past progress and help strategize for the future.",
  },
  "8+": {
    title: "Full engagements",
    body: "Devoting 8+ hours weekly opens up full part-time consulting engagements where you can drive meaningful impact. You'll work closely with multiple businesses, leading strategy and execution on ambitious projects.",
  },
};

export default function Step13() {
  const { answers , goToStep } = useQuiz();
  const msg = HOUR_MESSAGES[answers.hoursPerWeek ?? "4-8"] ?? HOUR_MESSAGES["4-8"];

  return (
    <div
      data-testid="step-note3-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />

      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={11} />

        <div
          className="flex-grow flex max-w-full"
          style={{ maxHeight: "calc(100dvh - 134px)" }}
        >
          <div className="flex flex-col flex-grow justify-center items-center max-w-full">
            <img
              src="https://d1cg29ukvkl76a.cloudfront.net/web/images/faces/face5.webp"
              alt="Advisor"
              width={142}
              height={157}
              className="w-[142px] h-[157px]"
            />
            <div className="flex flex-col gap-3 max-w-full mt-10">
              <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif]">
                {msg.title}
              </span>
              <span
                className="font-medium text-[14px] leading-6 text-center font-[Montserrat,sans-serif] whitespace-pre-wrap"
                style={{ color: "rgb(84,93,108)" }}
              >
                {msg.body}
              </span>
            </div>
          </div>
        </div>

        <ContinueButton
          label="Next"
          onClick={() => goToStep(14)}
          testId="next-button"
        />
      </div>
    </div>
  );
}
