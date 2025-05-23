import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState, useEffect } from "react";
import { ModelBadge } from "../features/models/ModelBadge";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogTopicForm } from "../features/generate/components/BlogTopicForm";
import Markdown from "react-markdown";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCopy,
  FaExpandArrowsAlt,
} from "react-icons/fa";
import { UnderDev } from "../components/UnderDev";
import { Button } from "../components/Button";
import { useBlogGeneration } from "../hooks/useBlogGeneration";
import { FormValues } from "../types/blog";
import { BlogOverlayButtons } from "../features/generate/components/BlogOverlayButtons";

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
  const [scrollInterupted, setScrollInterupted] = useState(false);

  // Form and Content States
  const [formValues, setFormValues] = useState<FormValues>({
    topic: "",
    details: "",
    keywords: [],
  });

  const { generatedBlog, isGenerating, handleGenerate, handleCopy } =
    useBlogGeneration();

  const handleGenerateClick = () => {
    if (formValues.topic === "" || isGenerating) {
      return;
    }
    setScrollInterupted(false);
    handleGenerate(formValues);
  };
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
      setScrollInterupted(true);
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
      if (!scrollInterupted) {
        const scrollToBottom = () => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        };
        scrollToBottom();
      }
    }
  }, [generatedBlog, isGenerating, scrollInterupted]);

  interface Step {
    name: string;
    description: string;
    component: React.ReactNode;
  }

  const steps: Step[] = [
    {
      name: "Blog Topic",
      description: "Set the topic and details for your blog post.",
      component: (
        <BlogTopicForm formValues={formValues} setFormValues={setFormValues} />
      ),
    },
    {
      name: "Blog Structure",
      description: "Define the structure of your blog post.",
      component: <UnderDev name="Blog Structure" />,
    },
    {
      name: "Blog Style",
      description: "Define the style of your blog post.",
      component: <UnderDev name="Blog Style" />,
    },
    {
      name: "Blog Examples",
      description: "Provide writing examples for your blog post.",
      component: <UnderDev name="Blog Examples" />,
    },
    {
      name: "Fact Checking",
      description: "Fact check the content of your blog post.",
      component: <UnderDev name="Fact Checking" />,
    },
    {
      name: "Finalize Blog Post",
      description: "Finalize the content of your blog post.",
      component: <UnderDev name="Finalize Blog Post" />,
    },
  ];
  // Content Components
  const stepNames = steps.map((step) => step.name);
  const stepDescriptions = steps.map((step) => step.description);
  const stepComponents = steps.map((step) => step.component);

  const useContent = (step: number) => {
    return step <= steps.length ? stepComponents[step] : null;
  };

  return (
    <PageContainer>
      {/* Top Bar */}
      <div className="flex flex-col gap-2">
        <Card className="flex flex-col">
          <GenerateWorkflow
            steps={stepNames}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
          />
        </Card>
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 h-full w-full overflow-y-hidden justify-between">
        {/* Left Side */}
        <Card
          className={`flex flex-col ${
            expanded
              ? "h-px lg:w-1/12 opacity-20 overflow-hidden"
              : "lg:w-1/3 opacity-100"
          } gap-2 h-full transition-all duration-300`}
          overrideDims={true}
        >
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">
              {activeStep + 1}. {stepNames[activeStep]}
            </h2>
          </div>
          <div className="w-full h-px bg-gray-700 "></div>
          <div className="flex flex-col gap-2">
            <div className="mb-2 text-sm text-gray-400">
              {stepDescriptions[activeStep]}
            </div>
            {useContent(activeStep)}
            <div className="w-full h-px bg-gray-700 my-4"></div>
            <div className="flex items-center gap-2 justify-between">
              {/* Generate Button */}
              <Button
                type={isGenerating ? "disabled" : "accent"}
                className={`w-full transition-all duration-300 ${
                  formValues.topic !== "" ? "opacity-100" : "opacity-0"
                }`}
                onClick={handleGenerateClick}
              >
                {isGenerating ? "Generating..." : "Generate Blog"}
              </Button>
              {/* Navigation Buttons */}
              <div className="flex items-center gap-2 justify-between">
                <Button
                  type="primary"
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg  items-center justify-center h-full"
                >
                  <FaArrowLeft className="my-1" />
                </Button>
                <Button
                  type="primary"
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg  items-center justify-center h-full"
                >
                  <FaArrowRight className="my-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
        {/* Right Side */}
        <Card
          className={`flex flex-col ${
            expanded ? "lg:w-11/12" : "lg:w-2/3"
          } gap-2 h-full overflow-y-hidden transition-all duration-300 pb-2`}
          overrideDims={true}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaExpandArrowsAlt onClick={() => setExpanded(!expanded)} />
              <h2 className="text-lg font-semibold">AI Output</h2>
            </div>
            <div
              className={`${
                wordCount > 1 ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 text-sm text-gray-400 rounded-full bg-gray-700 px-2 py-1 border border-white/10`}
            >
              {wordCount} words
            </div>
            <div className="flex flex-col transition-all duration-300">
              <ModelBadge
                activeModel={"GPT-4.1"}
                onClick={() => setShowModelList(true)}
              />
            </div>
            {generatedBlog && (
              <div className="flex items-center gap-2 absolute bottom-0 right-0 bg-gray-950/50 backdrop-blur-lg p-2 rounded-lg">
                <Button
                  type="primary"
                  onClick={handleCopy}
                  itemsRow={true}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg aspect-square items-center justify-center"
                >
                  <FaCopy className="text-base" />
                </Button>
              </div>
            )}
          </div>
          <div className="w-full h-px bg-gray-700 "></div>
          <div className="flex flex-col h-full pb-4 overflow-y-auto">
            {!generatedBlog ? (
              <div className="mb-2 text-sm text-gray-400">
                Your blog post will be generated here!
                <BlogSkeleton isGenerating={isGenerating} />
              </div>
            ) : (
              <div className="markdown flex flex-col flex-1 gap-2 overflow-y-auto h-full pt-2 relative">
                <Markdown>{generatedBlog}</Markdown>
              </div>
            )}
          </div>
        </Card>
      </div>
      <BlogOverlayButtons
        isGenerating={isGenerating}
        scrollInterupted={scrollInterupted}
        setScrollInterupted={setScrollInterupted}
        generatedBlog={generatedBlog}
      />
    </PageContainer>
  );
};
