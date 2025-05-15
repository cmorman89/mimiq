import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";

interface BreadcrumbsProps {
  breadcrumbs: string[];
  isHome: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * A breadcrumb navigation component that shows the current page's location in the site hierarchy.
 *
 * Features:
 * - Dynamic breadcrumb generation from route path
 * - Back button navigation
 * - Capitalized breadcrumb labels
 * - Chevron separators between items
 * - Hover effects on navigation items
 * - Home page detection and conditional rendering
 * - Responsive text sizing
 *
 * This component provides hierarchical navigation context, allowing users
 * to understand their current location and navigate to parent sections.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.breadcrumbs - Array of path segments for the current route
 * @param {boolean} props.isHome - Whether the current page is the home page
 * @returns {JSX.Element} A breadcrumb navigation component
 */
export const Breadcrumbs = ({ breadcrumbs, isHome }: BreadcrumbsProps) => {
  if (isHome) return null;

  const parentPath = `/${breadcrumbs.slice(0, -1).join("/")}`;

  return (
    <div className="flex items-center space-x-4 mb-8">
      {/* Back button */}
      <Link to={parentPath} className="hover:text-gray-700">
        <FaArrowLeft className="text-2xl text-white" />
      </Link>

      {/* Breadcrumbs */}
      <div className="flex gap-2 ml-2 text-4xl font-bold text-white">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2 ">
            <Link
              key={index}
              to={`/${breadcrumbs.slice(0, index + 1).join("/")}`}
              className="hover:text-gray-700"
            >
              {capitalize(crumb)}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <FaChevronRight className="text-2xl" />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
