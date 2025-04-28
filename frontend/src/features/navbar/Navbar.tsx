import { Link } from "react-router-dom";
import { NavItem } from "./components/NavItem";

export const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-white tracking-tight"
            >
              <span className="bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                MIM
              </span>
              <span className="bg-gradient-to-r from-rose-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                IQ
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem to="/generate">Generate</NavItem>
              <NavItem to="/knowledge">Knowledge</NavItem>
              <NavItem to="/workflow">Workflow</NavItem>
              <NavItem to="/utilities">Utilities</NavItem>
              <NavItem to="/settings">Settings</NavItem>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
