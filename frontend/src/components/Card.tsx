export const Card = ({
  children,
  className = "",
  type = "light",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "light" | "dark";
}) => {
  const bgColor = type === "light" ? "bg-white/5" : "bg-black/20";
  return (
    <div
      className={`relative flex flex-col overflow-auto w-full h-full rounded-xl border border-white/10 ${bgColor} backdrop-blur-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
};
