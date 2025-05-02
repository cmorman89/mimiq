export const Card = ({
  children,
  className = "",
  type = "light",
  padding = "default",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "light" | "dark";
  padding?: "default" | "tight" | "none";
}) => {
  const bgColor = type === "light" ? "bg-white/5" : "bg-black/20";
  const paddingClass = {
    default: "p-6",
    tight: "px-6 py-3",
    none: "px-6 py-0",
  }[padding];
  return (
    <div
      className={`relative flex overflow-auto w-full h-full rounded-xl border border-white/10 ${bgColor} backdrop-blur-sm ${paddingClass} ${className} shadow-lg`}
    >
      {children}
    </div>
  );
};
