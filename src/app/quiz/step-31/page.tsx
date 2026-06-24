"use client";

import { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { saveUser } from "@/lib/supabase";

export default function Step31() {
  const { answers, setAnswer, goToStep } = useQuiz();
  const [email, setEmail] = useState(answers.email ?? "");
  const [saving, setSaving] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    setAnswer("email", email);
    await saveUser({
      email,
      country: answers.country,
      quizAnswers: { ...answers, email } as Record<string, unknown>,
    });
    setSaving(false);
    goToStep(32);
  };

  return (
    <div
      data-testid="step-fill-email-container"
      className="flex flex-col items-center w-full h-full bg-white"
    >
      {/* Scrollable content area */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full">
        <div
          className="flex flex-col items-center w-full max-w-[664px] mx-auto px-4 sm:px-6 pt-8 pb-6"
          style={{ maxWidth: "100%" }}
        >
          <div className="flex flex-col items-center max-w-full w-full">
            <span className="font-semibold text-[26px] leading-[31px] text-black text-center font-[Montserrat,sans-serif] whitespace-pre-wrap">
              Receive offers from businesses interested in&nbsp;reaching out to&nbsp;you
            </span>
            <span
              className="font-medium text-[14px] leading-6 text-center font-[Montserrat,sans-serif] whitespace-pre-wrap mt-3"
              style={{ color: "rgb(84,93,108)" }}
            >
              Provide your primary email to ensure you don&apos;t miss any notifications
            </span>

            {/* Email input */}
            <div className="flex flex-col relative items-center w-full">
              <div className="w-full mt-8" style={{ maxWidth: 400 }}>
                <div
                  className="flex items-center rounded-lg"
                  style={{
                    backgroundColor: "rgb(242,244,246)",
                    border: "1px solid rgb(226,230,235)",
                    paddingLeft: "12px",
                  }}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path stroke="#818FA4" strokeLinecap="round" strokeLinejoin="round" d="M3.335 3.333h13.333c.917 0 1.667.75 1.667 1.667v10c0 .917-.75 1.667-1.667 1.667H3.335c-.917 0-1.667-.75-1.667-1.667V5c0-.917.75-1.667 1.667-1.667" />
                      <path stroke="#818FA4" strokeLinecap="round" strokeLinejoin="round" d="M18.335 5 10 10.833 1.668 5" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="block min-w-0 w-full bg-transparent outline-none"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      padding: "14px 12px",
                      border: 0,
                      color: "rgb(0,0,0)",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Assurances */}
            <div className="flex flex-col gap-2 mt-6 w-full" style={{ maxWidth: 400 }}>
              {["we do not send spam", "we do not share your email with 3rd parties"].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="flex justify-center items-center mt-[3px] shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 12 12">
                      <path d="M4.725 10 0 5.315l1.802-1.787 2.923 2.898L10.198 1 12 2.787z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[13px] leading-[18px] font-[Montserrat,sans-serif]">{text}</span>
                </div>
              ))}
            </div>

            {/* Product Hunt badge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://d1cg29ukvkl76a.cloudfront.net/web/images/brands/product_hunt.webp"
              alt="Product Hunt"
              style={{ width: 175, height: 39, marginTop: 32 }}
            />

            {/* Rating badge */}
            <div
              className="flex items-center justify-center w-full mt-5"
              style={{ maxWidth: 300, height: 87, mixBlendMode: "darken" }}
            >
              <div className="flex flex-col items-center flex-1">
                <span
                  className="font-semibold text-[10px] leading-[14px] tracking-[3px] font-[Montserrat,sans-serif]"
                  style={{ color: "rgb(84,93,108)" }}
                >
                  APP STORE
                </span>
                <span className="text-[20px] leading-6 mt-1" style={{ color: "rgb(255,180,67)" }}>
                  ★★★★★
                </span>
                <span className="font-semibold text-[22px] leading-7 text-black font-[Montserrat,sans-serif] mt-1">
                  5.0
                </span>
              </div>
              <div className="w-px h-[70px] mx-5" style={{ backgroundColor: "rgb(242,244,246)" }} />
              <div className="flex flex-col items-center flex-1">
                <span
                  className="font-semibold text-[10px] leading-[14px] tracking-[3px] font-[Montserrat,sans-serif]"
                  style={{ color: "rgb(84,93,108)" }}
                >
                  GOOGLE PLAY
                </span>
                <span className="text-[20px] leading-6 mt-1">
                  <span style={{ color: "rgb(255,180,67)" }}>★★★★</span>
                  <span style={{ color: "rgb(226,230,235)" }}>★</span>
                </span>
                <span className="font-semibold text-[22px] leading-7 text-black font-[Montserrat,sans-serif] mt-1">
                  4.2
                </span>
              </div>
            </div>

            {/* Old vector badge kept hidden; its embedded text paths are incomplete. */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="323"
              height="87"
              fill="none"
              viewBox="0 0 388 87"
              style={{ display: "none" }}
            >
              <path fill="#545D6C" d="M77.956 20.73h-3.5l-.69 1.62h-1.34l3.15-7h1.28l3.16 7h-1.36zm-.43-1.02-1.32-3.06-1.31 3.06zm7.46-4.36q.91 0 1.58.3.68.3 1.04.86t.36 1.33q0 .76-.36 1.33-.36.56-1.04.86-.67.3-1.58.3h-1.58v2.02h-1.3v-7zm-.06 3.88q.85 0 1.29-.36t.44-1.03-.44-1.03-1.29-.36h-1.52v2.78zm8.419-3.88q.91 0 1.58.3.68.3 1.04.86t.36 1.33q0 .76-.36 1.33-.36.56-1.04.86-.67.3-1.58.3h-1.58v2.02h-1.3v-7zm-.06 3.88q.849 0 1.29-.36.44-.36.44-1.03t-.44-1.03q-.441-.36-1.29-.36h-1.52v2.78zm11.769 3.22q-.81 0-1.57-.23-.75-.23-1.19-.61l.45-1.01q.43.34 1.05.56.63.21 1.26.21.78 0 1.16-.25.39-.25.39-.66 0-.3-.22-.49a1.4 1.4 0 0 0-.54-.31 12 12 0 0 0-.9-.25 11 11 0 0 1-1.3-.38 2.2 2.2 0 0 1-.85-.59q-.35-.41-.35-1.1 0-.58.31-1.05.32-.48.95-.76.64-.28 1.56-.28.64 0 1.26.16t1.07.46l-.41 1.01a4 4 0 0 0-.96-.41 3.6 3.6 0 0 0-.97-.14q-.77 0-1.15.26a.8.8 0 0 0-.37.69q0 .3.21.49.22.189.55.3t.9.25q.78.18 1.28.38a2.1 2.1 0 0 1 .85.59q.36.399.36 1.08 0 .579-.32 1.05-.31.47-.95.75t-1.56.28" />
              <path fill="#000" d="M97.348 66.77q2.961 0 4.38 1.16 1.42 1.14 1.42 3.12 0 1.26-.62 2.28t-1.86 1.62-3.06.6q-1.5 0-2.9-.42-1.4-.441-2.36-1.2l1.1-2.02q.78.639 1.86 1.02a7.2 7.2 0 0 0 2.26.36q1.38 0 2.16-.56.8-.58.8-1.58 0-1.08-.86-1.62-.84-.56-2.9-.56h-3.38l.72-7.62h8.22v2.18h-6.02l-.3 3.24zm8.86 8.72q-.68 0-1.16-.46-.48-.48-.48-1.2 0-.741.46-1.2a1.64 1.64 0 0 1 1.18-.46q.7 0 1.16.46.48.459.48 1.2 0 .72-.48 1.2-.48.46-1.16.46m8.928.06q-1.68 0-3-.84-1.32-.86-2.08-2.48-.76-1.64-.76-3.88t.76-3.86q.76-1.64 2.08-2.48 1.32-.86 3-.86t3 .86q1.341.84 2.1 2.48.76 1.62.76 3.86t-.76 3.88q-.759 1.62-2.1 2.48-1.32.84-3 .84m0-2.26q1.5 0 2.36-1.24.88-1.24.88-3.7t-.88-3.7q-.86-1.24-2.36-1.24-1.48 0-2.36 1.24-.86 1.24-.86 3.7t.86 3.7q.88 1.24 2.36 1.24" />
              <path fill="#FFB443" d="m65.48 31.35 2.359 5.254 5.726.619-4.269 3.866 1.18 5.637-4.995-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM86.48 31.35l2.359 5.254 5.726.619-4.269 3.866 1.18 5.637-4.995-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM107.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM128.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM149.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62z" />
              <path fill="#E2E6EB" d="M34.386 79.624H32.61l-1.975.786-1.778.983-1.58.787 1.777.59H33.4a5.93 5.93 0 0 0 2.765-1.967c.244-.368.443-.764.593-1.18l-1.185-.392z" />
              <path stroke="#F2F4F6" d="M193.981 0v87" />
              <path fill="#545D6C" d="M241.796 18.77h1.23v2.79a3.9 3.9 0 0 1-1.26.66q-.72.23-1.48.23-1.07 0-1.93-.46a3.5 3.5 0 0 1-1.35-1.29 3.53 3.53 0 0 1-.49-1.85q0-1.03.49-1.85a3.4 3.4 0 0 1 1.35-1.28q.87-.47 1.95-.47.88 0 1.6.29t1.21.85l-.82.8a2.63 2.63 0 0 0-1.93-.8q-.74 0-1.32.31-.57.309-.9.87-.32.56-.32 1.28 0 .699.32 1.26.33.56.9.88.58.32 1.31.32.82 0 1.44-.36z" />
              <path fill="#FFB443" d="m238.481 31.35 2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM259.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM280.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62zM301.481 31.35l2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62z" />
              <path fill="#E2E6EB" d="m322.481 31.35 2.358 5.254 5.726.619-4.269 3.866 1.181 5.637-4.996-2.864-4.996 2.864 1.18-5.637-4.268-3.866 5.726-.62z" />
              <path fill="#000" d="M278.499 72.17h-2.48v3.18h-2.52v-3.18h-7.68v-1.8l6.9-9.02h2.78l-6.5 8.62h4.58v-2.82h2.44v2.82h2.48zm3.045 3.32q-.68 0-1.16-.46-.48-.48-.48-1.2 0-.741.46-1.2a1.64 1.64 0 0 1 1.18-.46q.7 0 1.16.46.48.459.48 1.2 0 .72-.48 1.2-.48.46-1.16.46m13.658-2.34v2.2h-10.32v-1.74l5.56-5.28q.94-.9 1.26-1.56.34-.68.34-1.34 0-.981-.66-1.5-.66-.52-1.94-.52-2.14 0-3.28 1.46l-1.82-1.4q.82-1.1 2.2-1.7 1.4-.62 3.12-.62 2.28 0 3.64 1.08t1.36 2.94q0 1.14-.48 2.14-.48.999-1.84 2.28l-3.74 3.56z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sticky button + terms at bottom */}
      <div
        className="flex flex-col items-center gap-5 bg-white w-full px-4 py-4 shrink-0"
        style={{ boxShadow: "0 -1px 0 rgb(242,244,246)" }}
      >
        <button
          disabled={!isValid || saving}
          onClick={handleContinue}
          className="flex justify-center items-center rounded-lg transition-all duration-150 w-full max-w-[327px]"
          style={{
            padding: "13px 36px",
            background: isValid && !saving ? "rgb(0,0,0)" : "rgb(226,230,235)",
            border: "none",
            cursor: isValid && !saving ? "pointer" : "not-allowed",
          }}
        >
          <span className="font-semibold text-[15px] leading-[18px] font-[Montserrat,sans-serif]" style={{ color: isValid && !saving ? "white" : "rgb(129,143,164)" }}>
            {saving ? "Saving…" : "Continue"}
          </span>
        </button>

      </div>
    </div>
  );
}
