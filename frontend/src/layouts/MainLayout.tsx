import { Navbar } from "../features/navbar/Navbar";

/**
 * The main layout component that provides the base structure for the application.
 *
 * Features:
 * - Consistent navigation bar placement
 * - Full-height and full-width layout
 * - Flexible main content area
 * - Bottom padding for content spacing
 * - Semantic HTML structure
 *
 * This component serves as the root layout wrapper, providing a consistent
 * structure across all pages with the navigation bar and main content area.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 * @returns {JSX.Element} The main layout structure with navigation and content areas
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main-layout" className="relative flex flex-col min-h-full lg:h-full w-full">
      <Navbar />
      <main id="main-content" className="flex w-full h-full pb-6">
        {children}
      </main>
    </div>
  );
}
