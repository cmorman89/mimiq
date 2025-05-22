import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";

/**
 * A container component that provides consistent page layout and navigation structure.
 *
 * Features:
 * - Responsive width constraints
 * - Automatic breadcrumb generation
 * - Consistent padding and spacing
 * - Flexible content area
 * - Home page detection
 * - Z-index management for proper layering
 *
 * This component serves as a wrapper for page content, providing
 * consistent layout structure and navigation context across the application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered within the page container
 * @returns {JSX.Element} A page container with breadcrumb navigation
 */
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const breadcrumbs = location.pathname.split("/").filter(Boolean);
  const isHome = location.pathname === "/";

  return (
    <div
      id="page-container"
      className="max-w-[1400px] h-full w-full mx-auto pt-32 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col transition-all duration-300"
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} isHome={isHome} />
      <div
        id="page-content"
        className="flex flex-col gap-4 w-full flex-1 overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};
