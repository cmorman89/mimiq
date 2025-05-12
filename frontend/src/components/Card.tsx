export const Card = ({
  children = null,
  className = "",
  type = "light",
  padding = "default",
  transparent = true,
  onClick = () => {},
}: {
  children?: React.ReactNode;
  className?: string;
  type?: "light" | "dark";
  padding?: "default" | "tight" | "none";
  transparent?: boolean;
  onClick?: () => void;
}) => {
  const bgColor =
    type === "light"
      ? transparent
        ? "bg-white/5"
        : "bg-white"
      : transparent
      ? "bg-black/20"
      : "bg-slate-950/80";
  const paddingClass = {
    default: "p-6",
    tight: "px-6 py-3",
    none: "px-6 py-0",
  }[padding];
  return (
    <div
      className={`relative flex overflow-auto w-full h-full rounded-xl border border-white/10 ${bgColor} backdrop-blur-md ${paddingClass} ${className} shadow-lg`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
