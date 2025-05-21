import { Link } from "react-router-dom";
import { NavItem } from "./components/NavItem";
import { Logo } from "../../components/Logo";

/**
 * The main navigation bar component that provides site-wide navigation.
 *
 * Features:
 * - Fixed positioning at the top of the viewport
 * - Responsive design with mobile considerations
 * - Logo branding with home link
 * - Navigation items for main sections
 * - Gradient divider line
 * - Transparent background with blur effect
 * - Consistent spacing and alignment
 *
 * This component serves as the primary navigation interface,
 * providing access to all major sections of the application.
 *
 * @component
 * @returns {JSX.Element} The main navigation bar component
 */
export const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem to="/generate">Generate</NavItem>
              <NavItem to="/knowledge">Knowledge</NavItem>
              <NavItem to="/workflow">Workflow</NavItem>
              <NavItem to="/utilities">Utilities</NavItem>
              <NavItem to="/settings">Settings</NavItem>
              <div className="w-px h-4 bg-gray-700"></div>
              <NavItem to="/login" className="border-2 border-gray-700 rounded-full px-2 py-1">
                Login / Signup
              </NavItem>
            </div>
            <div
              id="navbar-divider"
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-mimiq"
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
