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
      <svg xmlns="http://www.w3.org/2000/svg" width="94" height="32" fill="none" viewBox="0 0 94 32" style={{ cursor: "pointer", position: "absolute", top: 15, left: 40, zIndex: 10 }}>
        <path fill="url(#logo-grad)" fillRule="evenodd" d="M2.23 3.7c0-.8.643-1.448 1.435-1.448a1.44 1.44 0 0 1 1.433 1.447c0 .8-.642 1.448-1.433 1.448A1.44 1.44 0 0 1 2.23 3.699M3.666 0C1.64 0 0 1.656 0 3.7c0 2.043 1.64 3.699 3.665 3.699 2.023 0 3.664-1.656 3.664-3.7C7.33 1.656 5.69 0 3.665 0m1.74 13.398c-.928-.814-2.374-.148-2.374 1.093v13.582c0 1.26 1.486 1.919 2.405 1.065l2.098-1.949a1.11 1.11 0 0 1 1.575.066c.418.458.388 1.17-.065 1.591l-2.098 1.949C4.598 32.977.8 31.295.8 28.073V14.49c0-3.172 3.696-4.873 6.068-2.793L18.421 21.83c.465.408.514 1.12.11 1.589s-1.108.519-1.573.111zm13.573 15.988c.928.814 2.374.149 2.374-1.093V14.712c0-1.261-1.485-1.92-2.404-1.065l-2.098 1.948a1.11 1.11 0 0 1-1.576-.066 1.133 1.133 0 0 1 .066-1.59l2.097-1.95c2.349-2.181 6.146-.5 6.146 2.723v13.581c0 3.172-3.695 4.874-6.068 2.793L5.963 20.956a1.133 1.133 0 0 1-.11-1.589 1.11 1.11 0 0 1 1.573-.112z" clipRule="evenodd" />
        <path fill="#000" d="M35.049 30.351h2.865V11.836c-.186-.105-.743-.316-1.353-.316-.955 0-1.512.422-1.512 1.344zM53.894 30.351v-8.193c0-3.346-1.757-5.454-5.683-5.454-3.396 0-5.415 1.028-5.68 1.16V30.35h2.732V19.602c.292-.131.985-.606 2.789-.606 2.653 0 3.11 1.37 3.11 3.926v7.43zM65.725 19.392c.08-.132.292-.58.292-1.133 0-.764-.425-1.133-1.247-1.133h-3.028v-5.31a3.5 3.5 0 0 0-1.3-.264c-.928 0-1.459.395-1.459 1.239v4.335h-2.175c-.08.131-.319.58-.319 1.133 0 .764.425 1.133 1.274 1.133h1.22v7.14c0 2.396 1.3 4.188 4.351 4.188 2.308 0 3.187-1.054 3.479-1.29l-1.062-1.687c-.185.132-.692.738-1.833.738-1.353 0-2.176-.527-2.176-2.292v-6.797zM75.015 18.996c1.622 0 2.789.975 3.213 1.397.558-.422.85-1.08.85-1.502 0-.527-.293-.896-.637-1.186-.398-.263-1.566-.948-3.612-.948-3.953 0-6.688 2.608-6.688 7.034s2.682 6.929 6.582 6.929a7.93 7.93 0 0 0 4.407-1.344l-1.167-1.87c-.265.184-1.539.975-2.921.975-2.441 0-4.062-1.476-4.062-4.743 0-3.135 1.594-4.742 4.035-4.742M84.92 11.93a3.6 3.6 0 0 0-1.273-.264c-.981 0-1.459.422-1.459 1.239V30.35h2.733v-7.166c0-2.318.905-4.189 3.372-4.189 2.072 0 2.974 1.318 2.974 3.636v7.72H94v-8.273c0-3.557-2.122-5.375-4.964-5.375-2.786 0-3.69 1.37-4.115 2.002z" />
        <defs>
          <linearGradient id="logo-grad" x1="6.289" x2="30.097" y1="0" y2="25.066" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5C11D7" />
            <stop offset="1" stopColor="#37CBFA" />
          </linearGradient>
        </defs>
      </svg>

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
              <a href="https://intch.org/legal/User_agreement.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                <span className="font-medium text-[12px] leading-4 font-[Montserrat,sans-serif]" style={{ color: "rgb(129,143,164)" }}>Subscription Terms</span>
              </a>
            </div>

            <span
              className="font-medium text-[10px] leading-[14px] text-center font-[Montserrat,sans-serif] mt-10 mb-4 whitespace-pre"
              style={{ color: "rgb(129,143,164)" }}
            >
              {`Intch INC\n919 North Market Street, Suite 950\nCity of Wilmington, County of New Castle, DE 19801\nUSA`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
