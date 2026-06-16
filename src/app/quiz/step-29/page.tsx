"use client";

import { useQuiz } from "@/contexts/QuizContext";

import { useEffect, useState } from "react";

const LOADING_ITEMS = [
  "Matching your skills and expertise",
  "Matching your availability",
  "Analysing types of projects",
  "Matching you with businesses",
];

const REVIEWS = [
  {
    name: "Jack O.",
    text: <>Discovering <b>Intch</b> came at the right time for me, especially <b>after a layoff.</b> It has <b>connected</b> me to a few <b>side projects,</b> which was crucial for <b>maintaining</b> my <b>lifestyle</b> and keeping the, providing me with added <b>financial stability.</b></>,
  },
  {
    name: "Rashid N.",
    text: <><b>Intch</b> is <b>useful.</b> After I got laid off, it <b>helped</b> me find some <b>side projects</b> to keep things <b>stable.</b> Now, I&apos;m working on different things, <b>sharpening my skills,</b> and even <b>moved to Dubai</b> for a change of scenery. It&apos;s been a good tool for <b>finding side-work,</b> and being part of this <b>community</b> feels cool.</>,
  },
  {
    name: "Elena G.",
    text: <>Hey, just wanted to <b>share</b> a bit about <b>Intch.</b> Found it when I was kinda bored with my job and <b>looking</b> for <b>something more.</b> It&apos;s pretty <b>cool; found</b> some side <b>gigs</b> that are helping me <b>learn new stuff.</b> Cheers, Intch</>,
  },
  {
    name: "Andrei P.",
    text: <>Post-layoff, <b>Intch</b> was there to offer some <b>side projects.</b> It&apos;s been useful for <b>staying afloat</b> and picking up new skills. It&apos;s been an <b>alright experience.</b></>,
  },
  {
    name: "Min-jun K.",
    text: <><b>I needed</b> an <b>extra source of income</b> and <b>Intch</b> turned out to be a <b>great platform</b> for that. <b>Found</b> quite a few <b>side projects</b> that have been <b>great for learning</b> new things and keeping busy. Being part of such a <b>cool community</b> has been a <b>great experience.</b></>,
  },
];

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 28 26" fill="rgb(255,180,67)">
    <path d="m14 0 3.555 9.107 9.76.567-7.563 6.195 2.477 9.457L14 20.048l-8.229 5.278 2.477-9.457L.685 9.674l9.76-.567z" />
  </svg>
);

export default function Step29() {
  const { goToStep } = useQuiz();
  const [activeCount, setActiveCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

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
      <div className="w-full h-3" />
      <div className="flex flex-col flex-1 justify-center items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 mt-2 mb-2">
        <div className="flex flex-col flex-grow justify-center items-center">
          {/* Spinner */}
          <svg className="animate-spin" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37.5" stroke="#F5F7FD" strokeWidth="5" />
            <circle
              cx="40"
              cy="40"
              r="37.5"
              stroke="#0DA95E"
              strokeWidth="5"
              strokeDasharray="150 101"
              strokeLinecap="round"
              transform="rotate(-90, 40, 40)"
            />
          </svg>

          <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif] mt-10">
            We&apos;re finding side projects that&nbsp;are a perfect fit&nbsp;for you
          </span>

          {/* Loading items */}
          <div className="flex flex-col gap-2 mt-10">
            {LOADING_ITEMS.map((item, i) => {
              const done = i < activeCount;
              return (
                <div key={i} className="flex items-center gap-2">
                  {done ? (
                    /* Green filled checkmark */
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path fill="#0DA95E" fillRule="evenodd" d="M11.125 19h-2.25A7.875 7.875 0 0 1 1 11.125v-2.25A7.875 7.875 0 0 1 8.875 1h2.25A7.875 7.875 0 0 1 19 8.875v2.25A7.875 7.875 0 0 1 11.125 19" clipRule="evenodd" />
                      <path fill="#fff" d="m8.885 13.867 5.827-5.827-1.374-1.373-4.453 4.453L6.373 8.61 5 9.982z" />
                    </svg>
                  ) : (
                    /* Gray outline circle */
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path
                        stroke="rgb(226,230,235)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.125 18h-2.25A6.875 6.875 0 0 1 2 11.125v-2.25A6.875 6.875 0 0 1 8.875 2h2.25A6.875 6.875 0 0 1 18 8.875v2.25A6.875 6.875 0 0 1 11.125 18"
                      />
                    </svg>
                  )}
                  <span
                    className="font-medium text-[13px] leading-6 font-[Montserrat,sans-serif] transition-colors duration-300"
                    style={{ color: done ? "rgb(13,169,94)" : "rgb(226,230,235)" }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-5 mt-[60px]">
            <span className="font-semibold text-[10px] leading-[17px] text-center uppercase tracking-wide font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>
              Trusted by professionals in 140+ countries
            </span>

            <div className="relative w-full max-w-[400px] mx-auto">
              {/* Left arrow */}
              <button
                onClick={prevReview}
                className="absolute top-1/2 -left-5 flex justify-center items-center w-[46px] h-[46px] rounded-full cursor-pointer z-10"
                style={{ backgroundColor: "rgb(245,247,253)", transform: "translateY(-50%) translate(-100%)", border: "none" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path fill="#818FA4" d="M11.646 14.354a.5.5 0 0 0 .708-.708zM8 10l-.354-.354-.353.354.353.354zm4.354-3.646a.5.5 0 0 0-.708-.708zm0 7.292-4-4-.708.708 4 4zm-4-3.292 4-4-.708-.708-4 4z" />
                </svg>
              </button>

              {/* Card */}
              <div className="flex flex-col gap-3 rounded-xl p-4" style={{ backgroundColor: "rgb(245,247,253)" }}>
                <div className="flex flex-row justify-between items-center">
                  <span className="font-semibold text-[14px] leading-4 font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>
                    {REVIEWS[reviewIdx].name}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => <StarIcon key={j} />)}
                  </div>
                </div>
                <span className="font-normal text-[13px] leading-[18px] text-black font-[Montserrat,sans-serif]">
                  {REVIEWS[reviewIdx].text}
                </span>
              </div>

              {/* Right arrow */}
              <button
                onClick={nextReview}
                className="absolute top-1/2 -right-5 flex justify-center items-center w-[46px] h-[46px] rounded-full cursor-pointer z-10"
                style={{ backgroundColor: "rgb(245,247,253)", transform: "translateY(-50%) translate(100%)", border: "none" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path fill="#818FA4" d="M8.354 14.354a.5.5 0 0 1-.708-.708zM12 10l.354-.354.353.354-.353.354zM7.646 6.354a.5.5 0 1 1 .708-.708zm0 7.292 4-4 .708.708-4 4zm4-3.292-4-4 .708-.708 4 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          disabled={!ready}
          onClick={() => ready && goToStep(30)}
          className="flex justify-center items-center rounded-lg transition-all duration-150 mt-4 w-[327px]"
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
