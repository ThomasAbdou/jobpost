export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-white"
      style={{ color: "rgb(82,97,120)", fontFamily: "Montserrat, sans-serif" }}
    >
      {children}
    </div>
  );
}
