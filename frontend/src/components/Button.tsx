import { Link } from "react-router-dom";

/**
 * A flexible button component that can function as either a button or a link.
 *
 * Features:
 * - Multiple button types (primary, secondary, accent, danger, disabled)
 * - Optional navigation using React Router's Link
 * - Customizable styling through className prop
 * - Hover effects and transitions
 * - Shadow effects for depth
 * - Gradient support for accent type
 *
 * @component
 * @param {Object} props - Component props
 * @param {string | null} [props.to] - Optional route path for navigation
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the button
 * @param {'primary' | 'secondary' | 'accent' | 'danger' | 'disabled'} [props.type='primary'] - Button style variant
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {() => void} [props.onClick] - Click event handler
 * @returns {JSX.Element} A styled button or link component
 */
export function Button({
  to = null,
  children,
  type = "primary",
  className = "",
  onClick = () => { },
  itemsRow = false,
}: {
  to?: string | null;
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "accent" | "danger" | "disabled";
  className?: string;
  onClick?: () => void;
  itemsRow?: boolean;
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
      className={`flex ${itemsRow ? "flex-row" : "flex-col"} text-center gap-2 rounded-lg px-4 py-2 border transition-colors ease-in-out duration-300 ${buttonClass[type]} ${className} shadow-lg`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
