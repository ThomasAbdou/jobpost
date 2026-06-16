"use client";

import { useQuiz } from "@/contexts/QuizContext";
import SegmentedProgressBar from "@/components/SegmentedProgressBar";

export default function Step10() {
  const { setAnswer , goToStep } = useQuiz();

  const choose = (val: "yes" | "no") => {
    setAnswer("usAuth", val);
    goToStep(11);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3" />

      <div
        className="flex flex-col flex-1 justify-between items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-8 sm:mb-2"
      >
        <SegmentedProgressBar filledCount={9} />

        <span
          className="font-semibold text-[24px] leading-8 text-black text-center font-[Montserrat,sans-serif]"
          style={{ marginBottom: 40 }}
        >
          Do you have authorization to work in the US?
        </span>

        <div className="flex gap-3 w-full max-w-[327px]">
          {/* No */}
          <button
            onClick={() => choose("no")}
            className="flex flex-col flex-1 justify-center items-center gap-4 rounded-xl cursor-pointer transition-all hover:opacity-80"
            style={{ backgroundColor: "rgb(255,244,236)", height: 104 }}
          >
            <span className="text-[32px] leading-[32px]">❌</span>
            <span
              className="font-semibold text-[14px] leading-5 font-[Montserrat,sans-serif]"
              style={{ color: "rgb(158,158,158)", margin: 0 }}
            >
              No
            </span>
          </button>

          {/* Yes */}
          <button
            onClick={() => choose("yes")}
            className="flex flex-col flex-1 justify-center items-center gap-4 rounded-xl cursor-pointer transition-all hover:opacity-80"
            style={{ backgroundColor: "rgb(233,255,237)", height: 104 }}
          >
            <span className="text-[32px] leading-[32px]">✅</span>
            <span
              className="font-semibold text-[14px] leading-5 font-[Montserrat,sans-serif]"
              style={{ color: "rgb(158,158,158)", margin: 0 }}
            >
              Yes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
