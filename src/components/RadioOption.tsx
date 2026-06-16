"use client";

interface RadioOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
  name?: string;
}

export default function RadioOption({ id, label, checked, onChange, name = "radio-group" }: RadioOptionProps) {
  return (
    <label
      className="flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "rgb(246,249,255)",
        padding: "13px 16px",
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(id)}
        className="sr-only"
      />
      <div
        className="flex-shrink-0 flex justify-center items-center w-6 h-6 rounded-full transition-all duration-200"
        style={{ border: "1px solid rgb(73,89,220)" }}
      >
        {checked && (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "rgb(73,89,220)" }}
          />
        )}
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
