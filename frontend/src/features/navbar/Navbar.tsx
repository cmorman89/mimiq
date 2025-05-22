import { Link } from "react-router-dom";
import { NavItem } from "./components/NavItem";
import { Logo } from "../../components/Logo";
import { useState } from "react";
import { useEffect } from "react";

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
  const [pageScrolled, setPageScrolled] = useState(false);
  const handleScroll = () => {
    setPageScrolled(window.scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${
        pageScrolled
          ? "bg-neutral-950/60 backdrop-blur-sm shadow-lg bg-gradient-to-b from-neutral-950 via-neutral-950/70 from-20%"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="">
            <Logo />
          </Link>
          <div className="block">
            <div className="ml-10 flex items-baseline gap-x-1 lg:gap-x-4">
              <NavItem to="/generate">Generate</NavItem>
              <NavItem to="/knowledge">Knowledge</NavItem>
              <NavItem to="/workflow" className="hidden sm:block">Workflow</NavItem>
              <NavItem to="/utilities">Utilities</NavItem>
              <NavItem to="/settings" className="hidden sm:block">Settings</NavItem>
              <div className="w-px h-4 bg-gray-700 mx-1 sm:mx-2"></div>
              <NavItem
                to="/login"
                className="border-2 border-gray-700 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap text-sm md:text-base"
              >
                Login<span className="hidden md:inline"> / Signup</span>
              </NavItem>
            </div>
          </div>
            <div
              id="navbar-divider"
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-mimiq"
            ></div>
        </div>
      </div>
    </nav>
  );
};
