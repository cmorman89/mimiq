import { Link, useLocation } from "react-router-dom";

/**
 * A navigation item component for the main navigation bar.
 *
 * Features:
 * - Active state detection based on current route
 * - Hover effects with color transition
 * - Active state indicator with bottom border
 * - Consistent padding and spacing
 * - Smooth color transitions
 *
 * This component is used to render individual navigation links in the navbar,
 * providing visual feedback for the current route and hover states.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.to - Navigation target path
 * @param {React.ReactNode} props.children - Content to display in the navigation item
 * @returns {JSX.Element} A navigation link component with active state handling
 */
export const NavItem = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`text-sm lg:text-base px-1 sm:px-2 md:px-3 lg:px-4 py-2 text-gray-400 hover:text-white transition-all duration-200 ${className} ${
        location.pathname.includes(to)
          ? "text-white border-b border-white"
          : "text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
};
