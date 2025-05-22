import { PageContainer } from "../features/page_container/PageContainer";
import { Button } from "../components/Button";
import { FaArrowRight } from "react-icons/fa";

/**
 * The Home page component that serves as the landing page for the application.
 *
 * Features:
 * - Hero section with animated text
 * - Feature announcement banner
 * - Gradient text effects
 * - Call-to-action buttons
 * - Responsive layout
 * - Animated cursor effect
 * - Navigation to key features
 *
 * This page serves as the main entry point to the application, showcasing
 * the AI-powered content generation capabilities and providing quick access
 * to the core features: content generation and example management.
 *
 * @component
 * @returns {JSX.Element} The landing page with hero section and feature navigation
 */
export const Home = () => {
  return (
    <PageContainer>
      <div className="max-w-2xl space-y-8 text-left lg:pt-20">
        <div>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
            New: AI-powered content generation in your unique style →
          </span>
        </div>
        <div className="space-y-6">
          <h2 className="text-[85px] font-semibold text-white tracking-tight leading-[1.1]">
            Write more,
            <br />
            like{" "}
            <span className="bg-gradient-mimiq bg-clip-text text-transparent font-bold">
              yourself
            </span>
            <span className="animate-blink font-light text-gray-300">|</span>
          </h2>
          <p className="text-2xl text-gray-400 font-light max-w-xl">
            Create authentic content in your unique voice—powered by AI that
            learns how you write.
          </p>
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <Button type="accent" to="/generate" className="flex-1">
            <span className="flex gap-2 items-center justify-center">
              Start Creating <FaArrowRight className="text-sm" />
            </span>
          </Button>
          <Button type="primary" to="/knowledge" className="flex-1">
            <span className="flex gap-2 items-center justify-center">
              Add Examples <FaArrowRight className="text-sm" />
            </span>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
