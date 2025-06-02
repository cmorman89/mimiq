import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState, useEffect } from "react";
import { BlogTopicForm } from "../features/generate/components/BlogTopicForm";
import { UnderDev } from "../components/UnderDev";
import { useBlogGeneration } from "../hooks/useBlogGeneration";
import { BlogOverlayButtons } from "../features/generate/components/BlogOverlayButtons";
import { BlogCard } from "../features/generate/components/BlogCard";
import { BlogFormProvider } from "../context/BlogFormContext";
import { BlogFormPanel } from "../features/generate/BlogFormPanel";
import { BlogActionMenu } from "../features/generate/components/BlogActionMenu";
import { Divider } from "../components/Divider";

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
  // // Form and Content States
  // const [formValues, setFormValues] = useState<FormValues>({
  //   topic: "",
  //   title: "",
  //   details: "",
  //   keywords: [],
  //   sections: [],
  // });

  const { generatedBlog, isGenerating, handleGenerate, setGeneratedBlog } =
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
        <BlogTopicForm />
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
            <BlogFormPanel activeStep={activeStep} stepNames={stepNames}>
              {useContent(activeStep)}
            </BlogFormPanel>
            <Divider className="bg-gray-700" />
            <BlogActionMenu
              isGenerating={isGenerating}
              handleGenerateClick={handleGenerateClick}
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
        scrollInterupted={scrollInterupted}
        setScrollInterupted={setScrollInterupted}
        generatedBlog={generatedBlog}
      />
    </PageContainer>
  );
};
