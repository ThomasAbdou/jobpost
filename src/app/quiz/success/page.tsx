"use client";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-6 px-6 text-center font-[Montserrat,sans-serif]">
      <div className="flex justify-center items-center w-20 h-20 rounded-full" style={{ backgroundColor: "rgb(13,169,94)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 20 20">
          <path fill="#fff" d="m8.885 13.867 5.827-5.827-1.374-1.373-4.453 4.453L6.373 8.61 5 9.982z" />
        </svg>
      </div>
      <h1 className="font-bold text-[28px] leading-[34px] text-black">You&apos;re all set!</h1>
      <p className="font-medium text-[15px] leading-6 text-center" style={{ color: "rgb(84,93,108)" }}>
        Your payment was successful. Welcome to Remoteo — we&apos;ll start matching you with side projects right away.
      </p>
      <a
        href="https://Remoteo.org"
        className="flex justify-center items-center rounded-xl w-full max-w-[327px] mt-4"
        style={{ padding: "15px 30px", background: "linear-gradient(74.28deg, rgb(92,17,215) -33.53%, rgb(55,203,250) 132.52%)" }}
      >
        <span className="font-semibold text-[15px] text-white font-[Montserrat,sans-serif]">Open Remoteo App</span>
      </a>
    </div>
  );
}
