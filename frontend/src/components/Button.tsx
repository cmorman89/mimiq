import { Link } from "react-router-dom";

export function Button({
  to = null,
  children,
  type = "primary",
  className = "",
}: {
  to: string | null;
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent" | "danger" | "disabled";
  className?: string;
}) {
  // Define button type styles
  const buttonClass = {
    primary: "bg-gray-700 hover:bg-gray-600 border-white/30",
    secondary: "bg-blue-700 border-white/30",
    accent:
      "bg-gradient-to-r from-fuchsia-700 via-purple-600 via-60% to-orange-500 border-gray-300/70 shimmer-hover",
    danger: "bg-red-700 border-white/30",
    disabled: "bg-gray-400 border-white/30",
  };
  return (
    // Safely handle a null target
    <Link
      to={to ?? ""}
      className={`flex flex-col text-center gap-2 rounded-lg px-4 py-2 border transition-colors ease-in-out duration-300 ${buttonClass[type]} ${className}`}
    >
      {children}
    </Link>
  );
}
