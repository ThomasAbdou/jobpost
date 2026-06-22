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
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <button
        type={type}
        data-testid={testId}
        onClick={onClick}
        disabled={disabled}
        style={{
          pointerEvents: "auto",
          background: disabled ? "rgb(226,230,235)" : "rgb(0,0,0)",
          border: "none",
          color: disabled ? "rgb(129,143,164)" : "rgb(255,255,255)",
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius: 8,
          padding: "13px 36px",
          width: "100%",
          maxWidth: 327,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.15s ease-in-out",
        }}
      >
        <span className="font-semibold text-[15px] leading-[18px] font-[Montserrat,sans-serif]" style={{ color: "inherit" }}>
          {label}
        </span>
      </button>
    </div>
  );
}
