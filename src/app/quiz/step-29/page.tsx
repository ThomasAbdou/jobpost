"use client";

import { useQuiz } from "@/contexts/QuizContext";
import { useEffect, useState } from "react";

const LOADING_ITEMS = [
  "Skills and expertise",
  "Availability",
  "Types of projects",
  "Offers for you",
];

const REVIEWS = [
  {
    name: "Jack O.",
    text: <>Discovering <b>Remoteo</b> came at the right time for me, especially <b>after a layoff.</b> It has <b>connected</b> me to a few <b>side projects,</b> which was crucial for <b>maintaining</b> my <b>lifestyle</b> and keeping the, providing me with added <b>financial stability.</b></>,
  },
  {
    name: "Rashid N.",
    text: <><b>Remoteo</b> is <b>useful.</b> After I got laid off, it <b>helped</b> me find some <b>side projects</b> to keep things <b>stable.</b> Now, I&apos;m working on different things, <b>sharpening my skills,</b> and even <b>moved to Dubai</b> for a change of scenery.</>,
  },
  {
    name: "Elena G.",
    text: <>Found it when I was kinda bored with my job and <b>looking</b> for <b>something more.</b> It&apos;s pretty <b>cool; found</b> some side <b>gigs</b> that are helping me <b>learn new stuff.</b></>,
  },
  {
    name: "Andrei P.",
    text: <>Post-layoff, <b>Remoteo</b> was there to offer some <b>side projects.</b> It&apos;s been useful for <b>staying afloat</b> and picking up new skills.</>,
  },
  {
    name: "Min-jun K.",
    text: <><b>I needed</b> an <b>extra source of income</b> and <b>Remoteo</b> turned out to be a <b>great platform</b> for that. <b>Found</b> quite a few <b>side projects</b> that have been <b>great for learning.</b></>,
  },
];

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 28 26" fill="rgb(255,180,67)">
    <path d="m14 0 3.555 9.107 9.76.567-7.563 6.195 2.477 9.457L14 20.048l-8.229 5.278 2.477-9.457L.685 9.674l9.76-.567z" />
  </svg>
);

export default function Step29() {
  const { goToStep } = useQuiz();
  const [activeCount, setActiveCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const allDone = activeCount >= LOADING_ITEMS.length;

  useEffect(() => {
    const t0 = setTimeout(() => setActiveCount(1), 600);
    const t1 = setTimeout(() => setActiveCount(2), 2200);
    const t2 = setTimeout(() => setActiveCount(3), 3800);
    const t3 = setTimeout(() => setActiveCount(4), 5400);
    const t4 = setTimeout(() => setReady(true), 6500);
    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const prevReview = () => setReviewIdx((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  const nextReview = () => setReviewIdx((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));

  return (
    <div data-testid="step-loading-container" className="flex flex-col items-center w-full h-full bg-white">
      <div className="w-full h-3 shrink-0" />
      <div className="flex flex-col flex-1 items-center w-full max-w-[664px] mx-auto px-6 sm:px-8 py-4">

        {/* Spinner or solid green circle */}
        <div className="flex justify-center items-center mb-5 mt-2">
          {allDone ? (
            <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#0DA95E" strokeWidth="6" fill="none" />
            </svg>
          ) : (
            <svg className="animate-spin" width="110" height="110" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#F5F7FD" strokeWidth="6" />
              <circle cx="50" cy="50" r="46" stroke="#0DA95E" strokeWidth="6" strokeDasharray="120 170" strokeLinecap="round" transform="rotate(-90, 50, 50)" />
            </svg>
          )}
        </div>

        <span className="font-semibold text-[22px] leading-[28px] text-black text-center font-[Montserrat,sans-serif] mb-5">
          We&apos;re finding side projects that are a perfect fit for you
        </span>

        {/* Loading items */}
        <div className="flex flex-col gap-2 items-center mb-5">
          {LOADING_ITEMS.map((item, i) => {
            const done = i < activeCount;
            return (
              <div key={i} className="flex items-center gap-2">
                {done ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" className="shrink-0">
                    <path fill="#0DA95E" fillRule="evenodd" d="M11.125 19h-2.25A7.875 7.875 0 0 1 1 11.125v-2.25A7.875 7.875 0 0 1 8.875 1h2.25A7.875 7.875 0 0 1 19 8.875v2.25A7.875 7.875 0 0 1 11.125 19" clipRule="evenodd" />
                    <path fill="#fff" d="m8.885 13.867 5.827-5.827-1.374-1.373-4.453 4.453L6.373 8.61 5 9.982z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" className="shrink-0">
                    <path stroke="rgb(226,230,235)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.125 18h-2.25A6.875 6.875 0 0 1 2 11.125v-2.25A6.875 6.875 0 0 1 8.875 2h2.25A6.875 6.875 0 0 1 18 8.875v2.25A6.875 6.875 0 0 1 11.125 18" />
                  </svg>
                )}
                <span className="font-medium text-[13px] leading-5 font-[Montserrat,sans-serif] transition-colors duration-300" style={{ color: done ? "rgb(13,169,94)" : "rgb(226,230,235)" }}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reviews */}
        <span className="font-semibold text-[10px] leading-[17px] text-center uppercase tracking-wide font-[Montserrat,sans-serif] mb-3" style={{ color: "rgb(129,143,164)" }}>
          Trusted by professionals in 140+ countries
        </span>

        <div className="relative w-full max-w-[340px] mx-auto mb-5">
          <button onClick={prevReview} className="absolute top-1/2 -left-4 flex justify-center items-center w-[32px] h-[32px] rounded-full cursor-pointer z-10" style={{ backgroundColor: "rgb(245,247,253)", transform: "translateY(-50%)", border: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path fill="#818FA4" d="M11.646 14.354a.5.5 0 0 0 .708-.708zM8 10l-.354-.354-.353.354.353.354zm4.354-3.646a.5.5 0 0 0-.708-.708zm0 7.292-4-4-.708.708 4 4zm-4-3.292 4-4-.708-.708-4 4z" />
            </svg>
          </button>

          <div className="flex flex-col gap-2 rounded-xl p-3" style={{ backgroundColor: "rgb(245,247,253)" }}>
            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold text-[13px] leading-4 font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>{REVIEWS[reviewIdx].name}</span>
              <div className="flex gap-[2px]">{Array.from({ length: 5 }).map((_, j) => <StarIcon key={j} />)}</div>
            </div>
            <span className="font-normal text-[12px] leading-[17px] text-black font-[Montserrat,sans-serif]">
              {REVIEWS[reviewIdx].text}
            </span>
          </div>

          <button onClick={nextReview} className="absolute top-1/2 -right-4 flex justify-center items-center w-[32px] h-[32px] rounded-full cursor-pointer z-10" style={{ backgroundColor: "rgb(245,247,253)", transform: "translateY(-50%)", border: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path fill="#818FA4" d="M8.354 14.354a.5.5 0 0 1-.708-.708zM12 10l.354-.354.353.354-.353.354zM7.646 6.354a.5.5 0 1 1 .708-.708zm0 7.292 4-4 .708.708-4 4zm4-3.292-4-4 .708-.708 4 4z" />
            </svg>
          </button>
        </div>

        {/* Continue button */}
        <button
          disabled={!ready}
          onClick={() => ready && goToStep(30)}
          className="flex justify-center items-center rounded-lg transition-all duration-150 w-full max-w-[327px] mt-auto"
          style={{
            padding: "13px 36px",
            background: ready ? "rgb(0,0,0)" : "rgb(226,230,235)",
            border: "none",
            cursor: ready ? "pointer" : "not-allowed",
          }}
        >
          <span className="font-semibold text-[15px] leading-[18px] font-[Montserrat,sans-serif]" style={{ color: ready ? "white" : "rgb(129,143,164)" }}>
            Continue
          </span>
        </button>

      </div>
    </div>
  );
}
