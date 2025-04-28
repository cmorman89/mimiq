import { Link } from "react-router-dom";

export function Button({
  to = null,
  children,
  type = "primary",
}: {
  to: string | null;
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent" | "danger" | "disabled";
}) {
  // Define button type styles
  const buttonClass = {
    primary: "bg-gray-700",
    secondary: "bg-blue-700",
    accent:
      "bg-gradient-to-r from-fuchsia-700 via-purple-600 via-60% to-orange-500",
    danger: "bg-red-700",
    disabled: "bg-gray-400",
  };
  return (
    // Safely handle a null target
    <Link to={to ?? ""}>
      <div
        className={`flex flex-col text-center gap-2 rounded-lg px-4 py-2 ${buttonClass[type]}`}
      >
        {children}
      </div>
    </Link>
  );
}
