interface ContinueButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  testId?: string;
}

export default function ContinueButton({
  label = "Continue",
  onClick,
  disabled = false,
  type = "button",
  testId,
}: ContinueButtonProps) {
  return (
    <button
      type={type}
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      className="rounded-[8px] flex justify-center items-center transition-all duration-150 w-full max-w-[327px] mx-auto px-9 py-[13px] cursor-pointer"
      style={{
        background: disabled ? "rgb(226,230,235)" : "rgb(0,0,0)",
        border: "none",
        color: disabled ? "rgb(129,143,164)" : "rgb(255,255,255)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span className="font-semibold text-[15px] leading-[18px] font-[Montserrat,sans-serif]" style={{ color: "inherit" }}>
        {label}
      </span>
    </button>
  );
}
