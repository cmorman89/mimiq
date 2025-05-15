import { Link } from "react-router-dom";
import { Logo } from "./Logo";

/**
 * A navigation button component that combines the Logo with optional child content.
 *
 * Features:
 * - Multiple style variants (primary/inverted)
 * - Optional child content placement (left/right)
 * - Navigation using React Router
 * - Hover effects with shimmer animation
 * - Backdrop blur for modern UI aesthetics
 * - Flexible styling through className prop
 *
 * This component is typically used in the navigation bar or header
 * to provide a branded navigation element.
 *
 * @component
 * @param {Object} props - Component props
 * @param {'primary' | 'inverted'} [props.type='primary'] - Button style variant
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.to='/'] - Navigation target path
 * @param {React.ReactNode} [props.children] - Optional content to display alongside the logo
 * @param {'left' | 'right'} [props.childPlacement='left'] - Placement of child content relative to logo
 * @returns {JSX.Element} A navigation button with logo and optional content
 */
export const LogoButton = ({
  type = "primary",
  className = "",
  to = "/",
  children,
  childPlacement = "left",
}: {
  type?: "primary" | "inverted";
  className?: string;
  to?: string;
  children?: React.ReactNode;
  childPlacement?: "left" | "right";
}) => {
  const buttonClass = {
    primary: "bg-white/5 backdrop-blur-sm border border-white/50",
    inverted: "bg-gradient-mimiq ring-1 ring-white/50",
  };
  return (
    <Link
      to={to}
      className={`flex ml-0.5 flex-1 items-center justify-center px-2 py-2 rounded-md shimmer-hover ${buttonClass[type]} ${className}`}
    >
      {childPlacement === "left" && children}
      <Logo className="text-3xl" type={type === "primary" ? "color" : "gray"} />
      {childPlacement === "right" && children}
    </Link>
  );
};
