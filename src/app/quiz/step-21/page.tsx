"use client";

import { useQuiz } from "@/contexts/QuizContext";

import SegmentedProgressBar from "@/components/SegmentedProgressBar";
import ContinueButton from "@/components/ContinueButton";

export default function Step21() {
  const { goToStep } = useQuiz();

  return (
    <div
      data-testid="step-job-info-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <SegmentedProgressBar filledCount={19} />

        <div className="flex flex-col flex-grow justify-center items-center gap-10 max-w-full">
          {/* CNBC logo */}
          <img
            src="https://d1cg29ukvkl76a.cloudfront.net/web/images/brands/cnbc.webp"
            alt="CNBC"
            width={147}
            height={116}
            className="w-[147px] h-[116px]"
          />

          <div className="flex flex-col items-center">
            {/* Orange quote mark */}
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.59893 0C3.34759 0 3.96791.222581 4.45989.667742 4.95187 1.1129 5.19786 1.68387 5.19786 2.38064c0 .34839-.054653.68710-.14161 1.01613-.08556.32904-.26738.82258-.54545 1.48065L2.82353 9H.224599L1.50802 4.52903c-.47059-.15484-.84492-.41613-1.12299-.78387C.128342 3.35806 0 2.90322 0 2.38064 0 1.68387.245989 1.1129.737968.667742 1.22995.222581 1.85027 0 2.59893 0zM9.40107 0c.74866 0 1.36898.222581 1.86096.667742C11.754 1.1129 12 1.68387 12 2.38064c0 .34839-.0535.68710-.1604 1.01613-.0856.32904-.26738.82258-.54545 1.48065L9.62567 9H7.02674L8.31016 4.52903c-.47059-.15484-.84492-.41613-1.12299-.78387C6.93048 3.35806 6.80214 2.90322 6.80214 2.38064c0-.69677.24599-1.26774.73797-1.71290C8.03209.222581 8.65241 0 9.40107 0z"
                fill="#F37021"
              />
            </svg>

            <div className="flex flex-col items-center mt-7">
              <span
                className="font-medium text-[18px] leading-6 text-black text-center font-[Montserrat,sans-serif]"
              >
                70% of the{" "}
                <strong
                  className="font-semibold"
                  style={{ color: "rgb(13,169,94)" }}
                >
                  most valuable jobs
                </strong>
                &nbsp;are&nbsp;not posted on publicly accessible job&nbsp;search websites.
              </span>

              <div
                className="my-9"
                style={{ backgroundColor: "rgb(226,230,235)", width: 172, height: 1 }}
              />

              <span
                className="font-medium text-[18px] leading-6 text-black text-center font-[Montserrat,sans-serif]"
              >
                Instead, they are{" "}
                <strong
                  className="font-semibold"
                  style={{ color: "rgb(13,169,94)" }}
                >
                  shared privately within exclusive communities such as&nbsp;Intch
                </strong>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ContinueButton label="Continue" onClick={() => goToStep(22)} testId="next-button" />
        </div>
      </div>
    </div>
  );
}
