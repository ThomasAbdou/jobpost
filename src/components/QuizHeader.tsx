"use client";

import Image from "next/image";
import Link from "next/link";

export default function QuizHeader() {
  return (
    <div className="flex justify-between items-end w-full mt-4 mb-2.5 px-10 absolute top-0 left-0 right-0 z-10">
      <Link href="/" aria-label="Home">
        <Image src="/remoteo3.png" alt="Logo" width={175} height={35} className="cursor-pointer" />
      </Link>
      <div className="cursor-pointer bg-white border border-[#e2e6eb] rounded-lg flex justify-center items-center gap-1 px-2 py-1.5">
        <span className="text-xl leading-[18px]">🇺🇸</span>
        <span className="font-semibold text-xs leading-4 text-black uppercase font-[Montserrat,sans-serif]">
          en
        </span>
      </div>
    </div>
  );
}
