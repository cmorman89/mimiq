import { Link } from "react-router-dom";

export function Button({
  to = null,
  children,
  type = "primary",
  className = "",
  onClick = () => {},
}: {
  to?: string | null;
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "accent" | "danger" | "disabled";
  className?: string;
  onClick?: () => void;
}) {
  // Define button type styles
  const buttonClass = {
    primary: "bg-gray-700 hover:bg-gray-600 border-white/20",
    secondary: "bg-blue-700 border-white/20",
    accent:
      "bg-gradient-to-r from-fuchsia-700 via-purple-600 via-60% to-orange-500 border-gray-600/90 shimmer-hover",
    danger: "bg-red-700 border-white/20",
    disabled: "bg-gray-400 border-white/20",
  };
  return (
    // Safely handle a null target
    <Link
      to={to ?? ""}
      className={`flex flex-col text-center gap-2 rounded-lg px-4 py-2 border transition-colors ease-in-out duration-300 ${buttonClass[type]} ${className} shadow-lg`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
