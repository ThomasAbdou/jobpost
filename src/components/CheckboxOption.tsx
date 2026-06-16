"use client";

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export default function CheckboxOption({ id, label, checked, onChange }: CheckboxOptionProps) {
  return (
    <label
      className="flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "rgb(246,249,255)",
        padding: "20px",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
        className="sr-only"
      />
      <div
        className="flex-shrink-0 flex justify-center items-center w-6 h-6 rounded-md transition-all duration-200"
        style={{
          border: "1px solid rgb(73,89,220)",
          backgroundColor: checked ? "rgb(73,89,220)" : "transparent",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          style={{ opacity: checked ? 1 : 0, transition: "0.2s ease-in-out" }}
        >
          <path
            d="M4.725 10 0 5.315l1.802-1.787 2.923 2.898L10.198 1 12 2.787z"
            fill="white"
          />
        </svg>
      </div>
      <span
        className="font-semibold text-[14px] leading-5 font-[Montserrat,sans-serif] transition-all duration-200"
        style={{ color: "rgb(0,0,0)", margin: 0 }}
      >
        {label}
      </span>
    </label>
  );
}
