import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState, useEffect } from "react";
import { useBlogGeneration } from "../hooks/useBlogGeneration";
import { BlogOverlayButtons } from "../features/generate/components/BlogOverlayButtons";
import { BlogCard } from "../features/generate/components/BlogCard";
import { BlogFormProvider } from "../context/BlogFormContext";
import { BlogFormPanel } from "../features/generate/BlogFormPanel";
import { BlogActionMenu } from "../features/generate/components/BlogActionMenu";
import { Divider } from "../components/Divider";
import { steps } from "../features/generate/BlogStepComponents";

/**
 * The Generate page component that provides a multi-step blog generation workflow.
 *
 * Features:
 * - Multi-step blog generation process
 * - Interactive workflow navigation
 * - Model selection and display
 * - Split-pane layout
 * - Step-specific content rendering
 * - Progress tracking
 * - Model output preview
 *
 * This page implements a guided blog generation workflow with multiple steps:
 * 1. Blog Topic selection
 * 2. Blog Structure definition
 * 3. Blog Style configuration
 * 4. Blog Examples review
 * 5. Final blog post generation
 *
 * @component
 * @param {Object} props - Component props
 * @param {(show: boolean) => void} props.setShowModelList - Function to control model selection modal
 * @returns {JSX.Element} The blog generation page with workflow steps and model output
 */
export const Generate = ({
  setShowModelList,
}: {
  setShowModelList: (show: boolean) => void;
}) => {
  // UI States
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [scrollInterrupted, setScrollInterrupted] = useState(false);

  const { generatedBlog, isGenerating, handleGenerate, setGeneratedBlog } =
    useBlogGeneration();

  // Effects
  useEffect(() => {
    localStorage.setItem("generatedBlog", generatedBlog);
  }, [generatedBlog]);

  useEffect(() => {
    const wordCount = generatedBlog.split(" ").length;
    setWordCount(wordCount);
  }, [generatedBlog]);

  // Event listeners for stop scrolling
  useEffect(() => {
    const handleStopScrolling = () => {
      setScrollInterrupted(true);
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        handleStopScrolling();
      }
    };
    window.addEventListener("mousedown", handleStopScrolling);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleStopScrolling);
    window.addEventListener("touchstart", handleStopScrolling);
    return () => {
      window.removeEventListener("mousedown", handleStopScrolling);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleStopScrolling);
      window.removeEventListener("touchstart", handleStopScrolling);
    };
  }, []);

  // Auto scroll to bottom when generating
  useEffect(() => {
    if (generatedBlog && isGenerating) {
      if (!scrollInterrupted) {
        const scrollToBottom = () => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        };
        scrollToBottom();
      }
    }
  }, [generatedBlog, isGenerating, scrollInterrupted]);


  // Content Components

  return (
    <PageContainer>
      {/* Top Bar */}
      <div className="flex flex-col gap-2">
        <Card className="flex flex-col">
          <GenerateWorkflow
            steps={steps.map((step) => step.name)}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
          />
        </Card>
      </div>
      {/* Main Content */}
      <BlogFormProvider>
        <div className="flex flex-col xl:flex-row gap-4 h-full w-full overflow-y-hidden justify-between">
          {/* Left Side */}
          <Card
            className={`flex flex-col ${
              expanded
                ? "h-px xl:w-1/12 opacity-20 overflow-hidden"
                : "xl:w-1/2 opacity-100"
            } gap-4 h-full transition-all duration-300`}
            padding="tight"
            overrideDims={true}
          >
            <BlogFormPanel steps={steps} activeStep={activeStep} />
            <Divider className="bg-gray-700" />
            <BlogActionMenu
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              setScrollInterrupted={setScrollInterrupted}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
            />
          </Card>
          {/* Right Side */}
          <BlogCard
            generatedBlog={generatedBlog}
            setGeneratedBlog={setGeneratedBlog}
            isGenerating={isGenerating}
            wordCount={wordCount}
            expanded={expanded}
            setExpanded={setExpanded}
            setShowModelList={setShowModelList}
          />
        </div>
      </BlogFormProvider>
      <BlogOverlayButtons
        isGenerating={isGenerating}
        scrollInterrupted={scrollInterrupted}
        setScrollInterrupted={setScrollInterrupted}
        generatedBlog={generatedBlog}
      />
    </PageContainer>
  );
};
