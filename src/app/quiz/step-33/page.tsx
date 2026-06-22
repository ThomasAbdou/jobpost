"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";

async function startCheckout(planId: string, email: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId, email }),
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
  else console.error("Checkout error:", data.error);
}

const PLANS = [
  {
    id: "lifetime",
    label: "Lifetime",
    originalPrice: "$99.99",
    badge: { text: "SAVE 90%", color: "rgb(13,169,94)" },
    priceDetail: <><span style={{ textDecoration: "line-through", color: "rgb(255,67,67)" }}>$0.67</span> &lt; $0.01/day</>,
  },
  {
    id: "year",
    label: "1 year",
    originalPrice: "$49.99",
    badge: { text: "BESTSELLER", color: "rgb(255,180,67)" },
    priceDetail: <><span style={{ textDecoration: "line-through", color: "rgb(255,67,67)" }}>$0.67</span> $0.14/day</>,
  },
  {
    id: "month",
    label: "1 month",
    originalPrice: null,
    strikePrice: "39.99",
    price: "$19.99",
    badge: null,
    priceDetail: "$0.67/day",
  },
];

const CheckIcon = ({ fill = "rgb(13,169,94)" }: { fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 12 12">
    <path d="M4.725 10 0 5.315l1.802-1.787 2.923 2.898L10.198 1 12 2.787z" fill={fill} />
  </svg>
);

const RadioCircle = ({ selected }: { selected: boolean }) => (
  <div
    className="flex-shrink-0 flex justify-center items-center w-5 h-5 rounded-full"
    style={{
      border: selected ? "solid" : "1px solid rgb(202,206,247)",
      backgroundColor: selected ? "rgb(77,96,230)" : "transparent",
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 16 16">
      <path fill="#fff" d="M6.513 13 1 7.794 3.103 5.81l3.41 3.22L12.897 3 15 4.986z" />
    </svg>
  </div>
);

export default function Step33() {
  const { answers } = useQuiz();
  const [selectedPlan, setSelectedPlan] = useState("month");
  const [loading, setLoading] = useState(false);

  return (
    <div id="__next" style={{ height: "100%", margin: 0, padding: 0, backgroundColor: "rgb(255,255,255)", color: "rgb(82,97,120)", fontFamily: "Montserrat, sans-serif" }}>
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/remoteo3.png" alt="Logo" style={{ cursor: "pointer", position: "absolute", top: 15, left: 40, zIndex: 10, width: 175, height: 35 }} />

      <div className="flex flex-col items-center w-full h-full" style={{ paddingTop: 64 }}>
        <div className="flex flex-col justify-center items-center relative" style={{ width: 420, maxWidth: "100%" }}>

          <span className="font-bold text-[36px] leading-[43px] text-black text-center font-[Montserrat,sans-serif] mt-10">
            Choose Your Plan
          </span>

          <div className="flex flex-col justify-center items-center w-full px-10">
            <span className="font-medium text-[16px] leading-6 text-center font-[Montserrat,sans-serif] mt-4" style={{ color: "rgb(129,143,164)" }}>
              for <strong>{answers.email || "you"}</strong>
            </span>

            {/* 91% card */}
            <div
              className="flex justify-center w-full mt-7 rounded-2xl px-4 py-3"
              style={{ backgroundColor: "rgb(245,247,253)" }}
            >
              <span className="font-normal text-[13px] leading-[18px] text-center font-[Montserrat,sans-serif] whitespace-pre-wrap" style={{ color: "rgb(84,93,108)" }}>
                <span style={{ fontWeight: 600, color: "rgb(73,89,220)" }}>91% of users</span> stay with us after the initial{"\n"}30-day&nbsp;subscription
              </span>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2 w-full mt-7">
              {[
                "Earn extra income with side projects",
                "8,000+ active part-time jobs available",
                "Network with top professionals from 140+ countries",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="mt-[3px]"><CheckIcon /></div>
                  <span className="font-medium text-[13px] leading-[18px] text-black font-[Montserrat,sans-serif] whitespace-pre-wrap">{b}</span>
                </div>
              ))}
            </div>

            {/* Plan options */}
            <div className="w-full mt-6">
              <div className="flex flex-col gap-2">
                {PLANS.map((plan) => {
                  const sel = selectedPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className="flex justify-between items-center w-full rounded-xl"
                      style={{
                        minHeight: 68,
                        padding: "13px 16px 12px",
                        backgroundColor: "rgb(255,255,255)",
                        border: sel ? "1.5px solid rgb(89,57,232)" : "1.5px solid rgb(202,206,247)",
                        boxShadow: sel ? "rgba(62,79,143,0.1) 0px 8px 12px" : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ marginRight: 12 }}>
                        <RadioCircle selected={sel} />
                      </div>
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col gap-1 justify-center">
                          <span className="font-semibold text-[13px] leading-[18px] whitespace-pre-wrap font-[Montserrat,sans-serif]" style={{ color: "rgb(77,96,230)" }}>
                            {plan.label}
                          </span>
                          <div className="flex gap-1">
                            {plan.strikePrice && (
                              <span className="font-medium text-[12px] leading-4 whitespace-pre-wrap font-[Montserrat,sans-serif]" style={{ color: "rgb(255,67,67)", textDecoration: "line-through" }}>
                                {plan.strikePrice}
                              </span>
                            )}
                            <span className="font-medium text-[12px] leading-4 whitespace-pre-wrap font-[Montserrat,sans-serif]" style={{ color: "rgb(153,172,223)", opacity: 0.5 }}>
                              {plan.originalPrice ?? plan.price}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-between items-end flex-shrink-0">
                          {plan.badge ? (
                            <div className="flex justify-center items-center rounded px-[6px] py-1" style={{ backgroundColor: plan.badge.color }}>
                              <span className="font-medium text-[10px] leading-[14px] text-white whitespace-pre-wrap font-[Montserrat,sans-serif]">{plan.badge.text}</span>
                            </div>
                          ) : <div />}
                          <span className="font-medium text-[12px] leading-4 whitespace-pre-wrap font-[Montserrat,sans-serif]" style={{ color: "rgb(84,93,108)" }}>
                            {plan.priceDetail}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Promo code */}
              <div className="flex justify-center items-center w-full">
                <button type="button" style={{ background: "none", border: "none", margin: "24px 0 0", cursor: "pointer" }}>
                  <span className="font-medium text-[13px] leading-[18px] font-[Montserrat,sans-serif] underline" style={{ color: "rgb(73,89,220)" }}>
                    I have a promo-code
                  </span>
                </button>
              </div>
            </div>

            {/* Get Access button */}
            <button
              data-testid="next-button"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await startCheckout(selectedPlan, answers.email ?? "");
                setLoading(false);
              }}
              className="flex justify-center items-center w-full rounded-xl mt-6"
              style={{
                padding: "15px 30px",
                background: loading
                  ? "rgb(226,230,235)"
                  : "linear-gradient(74.28deg, rgb(92,17,215) -33.53%, rgb(55,203,250) 132.52%)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
                    <path d="M11.26 5.812 2 15.998h20L12.74 5.812a1 1 0 0 0-1.48 0" opacity="0.5" />
                    <path d="m12.006 15.715 8.275-8.859a1 1 0 0 1 1.73.683v12.465H2V7.538a1 1 0 0 1 1.73-.683z" />
                  </g>
                  <defs>
                    <clipPath id="mail-clip">
                      <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-medium text-[15px] leading-[14px] font-[Montserrat,sans-serif]" style={{ color: loading ? "rgb(129,143,164)" : "white" }}>
                  {loading ? "Redirecting…" : "Get Access"}
                </span>
              </div>
            </button>

            <span className="font-medium text-[12px] leading-4 text-center font-[Montserrat,sans-serif] mt-4" style={{ color: "rgb(129,143,164)" }}>
              Extended every month after 1-month intro offer at the full price of $39.99 if you do not cancel 24 hours before the renewal date in your account settings.
            </span>

            <div className="mt-4">
              <a href="https://Remoteo.org/legal/User_agreement.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                <span className="font-medium text-[12px] leading-4 font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>Subscription Terms</span>
              </a>
            </div>

            <span
              className="font-medium text-[10px] leading-[14px] text-center font-[Montserrat,sans-serif] mt-10 mb-[52px] whitespace-pre"
              style={{ color: "rgb(129,143,164)" }}
            >
              {`Remoteo INC\n919 North Market Street, Suite 950\nCity of Wilmington, County of New Castle, DE 19801\nUSA`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
