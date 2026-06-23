"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuiz } from "@/contexts/QuizContext";
import { trackStep } from "@/lib/visitor";
import Step1 from "./step-1/page";
import Step2 from "./step-2/page";
import Step3 from "./step-3/page";
import Step4 from "./step-4/page";
import Step5 from "./step-5/page";
import Step6 from "./step-6/page";
import Step7 from "./step-7/page";
import Step8 from "./step-8/page";
import Step9 from "./step-9/page";
import Step10 from "./step-10/page";
import Step11 from "./step-11/page";
import Step12 from "./step-12/page";
import Step13 from "./step-13/page";
import Step14 from "./step-14/page";
import Step15 from "./step-15/page";
import Step16 from "./step-16/page";
import Step17 from "./step-17/page";
import Step18 from "./step-18/page";
import Step19 from "./step-19/page";
import Step20 from "./step-20/page";
import Step21 from "./step-21/page";
import Step22 from "./step-22/page";
import Step23 from "./step-23/page";
import Step24 from "./step-24/page";
import Step25 from "./step-25/page";
import Step26 from "./step-26/page";
import Step27 from "./step-27/page";
import Step28 from "./step-28/page";
import Step29 from "./step-29/page";
import Step30 from "./step-30/page";
import Step31 from "./step-31/page";
import Step32 from "./step-32/page";
import Step33 from "./step-33/page";

const STEPS: Record<number, React.ComponentType> = {
  1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5,
  6: Step6, 7: Step7, 8: Step8, 9: Step9, 10: Step10,
  11: Step11, 12: Step12, 13: Step13, 14: Step14, 15: Step15,
  16: Step16, 17: Step17, 18: Step18, 19: Step19, 20: Step20,
  21: Step21, 22: Step22, 23: Step23, 24: Step24, 25: Step25,
  26: Step26, 27: Step27, 28: Step28, 29: Step29, 30: Step30,
  31: Step31, 32: Step32, 33: Step33,
};

function QuizInner() {
  const { currentStep, resetQuiz, goToStep, answers } = useQuiz();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("cancel") === "1") {
      goToStep(33);
    } else {
      resetQuiz();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Record the furthest step each visitor reaches.
  useEffect(() => {
    trackStep(currentStep, {
      email: answers.email,
      country: answers.country,
    });
  }, [currentStep, answers.email, answers.country]);

  const StepComponent = STEPS[currentStep] ?? Step1;

  // Steps that render their own button/footer inside a full-height layout
  // should not reserve the 96px space used by the global fixed ContinueButton.
  const selfManagedSteps = new Set([29, 31, 33]);
  const paddingBottom = selfManagedSteps.has(currentStep) ? 0 : 96;

  return (
    <div style={{ height: "100dvh", overflow: "hidden", paddingBottom }}>
      <StepComponent />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <QuizInner />
    </Suspense>
  );
}
