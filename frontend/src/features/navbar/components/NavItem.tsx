import { Link, useLocation } from "react-router-dom";

export const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 ${
        location.pathname.includes(to) ? "text-white" : "text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
};
