import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";

interface BreadcrumbsProps {
  breadcrumbs: string[];
  isHome: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

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
            {index < breadcrumbs.length - 1 ? <FaChevronRight className="text-2xl" /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
