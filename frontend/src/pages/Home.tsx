import { Link } from "react-router-dom";
import { PageContainer } from "../features/page_container/PageContainer";
import { LogoButton } from "../components/LogoButton";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
export const Home = () => {
  return (
    <PageContainer>
      <div className="max-w-2xl space-y-8 text-left pt-20">
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
            Generate authentic content that perfectly matches your unique voice
            and writing style, using AI that learns from you.
          </p>
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <LogoButton type="inverted" />
          <Link
            to="/generate"
            className="px-6 py-3 text-base font-medium bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Creating
          </Link>
          <Link
            to="/examples"
            className="px-6 py-3 text-base font-medium text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            View Examples
          </Link>
          <Button to="/generate" type="primary"><Logo /></Button>
        </div>
      </div>
    </PageContainer>
  );
};
