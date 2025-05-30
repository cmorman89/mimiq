import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState, useEffect } from "react";
import { BlogTopicForm } from "../features/generate/components/BlogTopicForm";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { UnderDev } from "../components/UnderDev";
import { Button } from "../components/Button";
import { useBlogGeneration } from "../hooks/useBlogGeneration";
import { FormValues } from "../types/blog";
import { BlogOverlayButtons } from "../features/generate/components/BlogOverlayButtons";
import { BlogCard } from "../features/generate/components/BlogCard";
import {
  BlogTopicWizardMenu,
  BlogTopicWizardResultItem,
} from "../features/generate/components/BlogTopicWizardMenu";

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
  const [isWizard, setIsWizard] = useState(false);
  const [initialChoice, setInitialChoice] = useState(false);
  // Form and Content States
  const [formValues, setFormValues] = useState<FormValues>({
    topic: "",
    title: "",
    details: "",
    keywords: [],
    sections: [],
  });

  const { generatedBlog, isGenerating, handleGenerate, setGeneratedBlog } =
    useBlogGeneration();

  const handleItemOnClick = (
    item: BlogTopicWizardResultItem,
    label: keyof BlogTopicWizardResultItem
  ) => {
    if (label === "title") {
      label = "topic";
    }
    setFormValues({ ...formValues, [label]: item[label] });
    setIsWizard(false);
  };

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
        <BlogTopicForm
          formValues={formValues}
          setFormValues={setFormValues}
          isWizard={isWizard}
          setIsWizard={setIsWizard}
          handleItemOnClick={handleItemOnClick}
          initialChoice={initialChoice}
          setInitialChoice={setInitialChoice}
        />
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

  const useContent = (step: number, isWizard: boolean | null) => {
    if (isWizard) {
      return <BlogTopicWizardMenu handleItemOnClick={handleItemOnClick} />;
    }
    return step < steps.length ? stepComponents[step] : null;
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
      <div className="flex flex-col xl:flex-row gap-4 h-full w-full overflow-y-hidden justify-between">
        {/* Left Side */}
        <Card
          className={`flex flex-col ${
            expanded
              ? "h-px xl:w-1/12 opacity-20 overflow-hidden"
              : "xl:w-1/2 opacity-100"
          } gap-2 h-full transition-all duration-300`}
          padding="tight"
          overrideDims={true}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {activeStep + 1}. {stepNames[activeStep]}
            </h2>
            <Button
              type="primary"
              onClick={() => setIsWizard(!isWizard)}
              className="text-xs text-gray-400"
            >
              {isWizard ? "Manual" : "Wizard"}
            </Button>
          </div>
          <div className="w-full h-px bg-gray-700 "></div>
          <div className="flex flex-col gap-2">
            <div className="mb-2 text-sm text-gray-400">
              {stepDescriptions[activeStep]}
            </div>
            {useContent(activeStep, isWizard)}
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
      <BlogOverlayButtons
        isGenerating={isGenerating}
        scrollInterupted={scrollInterupted}
        setScrollInterupted={setScrollInterupted}
        generatedBlog={generatedBlog}
      />
    </PageContainer>
  );
};
