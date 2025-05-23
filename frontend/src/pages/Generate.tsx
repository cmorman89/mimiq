import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState, useEffect } from "react";
import { ModelBadge } from "../features/models/ModelBadge";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogTopicForm } from "../features/generate/components/BlogTopicForm";
import Markdown from "react-markdown";
import { FaCopy, FaExpandArrowsAlt } from "react-icons/fa";
import { UnderDev } from "../components/UnderDev";
import { Button } from "../components/Button";

interface FormValues {
  topic: string;
  details: string;
  keywords: string[];
}

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
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  // UI States
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [scrollInterupted, setScrollInterupted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Form and Content States
  const [formValues, setFormValues] = useState<FormValues>({
    topic: "",
    details: "",
    keywords: [],
  });
  const [generatedBlog, setGeneratedBlog] = useState<string>(() => {
    return localStorage.getItem("generatedBlog") || "";
  });
  const [isGenerating, setIsGenerating] = useState(false);
  // Constants
  const steps = [
    "Blog Topic",
    "Blog Structure",
    "Blog Style",
    "Blog Examples",
    "Fact Checking",
    "Finalize Blog Post",
  ];

  // Effects
  useEffect(() => {
    localStorage.setItem("generatedBlog", generatedBlog);
  }, [generatedBlog]);

  useEffect(() => {
    const wordCount = generatedBlog.split(" ").length;
    setWordCount(wordCount);
  }, [generatedBlog]);

  // Auto scroll to bottom when generating
  useEffect(() => {
    if (generatedBlog && isGenerating) {
      if (!scrollInterupted) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

      const lastPosition = scrollPosition;
      const newPosition = window.scrollY;
      const bottomOffset = 20;
      const bottomPosition =
        document.body.scrollHeight - window.innerHeight - bottomOffset;

      const atBottom = newPosition >= bottomPosition;
      const wasInterrupted = newPosition < lastPosition;

      // Detect interruption
      if (wasInterrupted && !scrollInterupted) {
        setScrollInterupted(true);
      }

      // Detect re-engagement
      if (atBottom && scrollInterupted) {
        setScrollInterupted(false);
      }

      // console.log(
      //   `newPosition: ${newPosition}\nlastPosition: ${lastPosition}\nbottomPosition: ${bottomPosition}\natBottom: ${atBottom}\nwasInterrupted: ${wasInterrupted}\nscrollInterupted: ${scrollInterupted}`
      // );

      setScrollPosition(newPosition);
    }
  }, [generatedBlog, isGenerating, scrollPosition, scrollInterupted]);

  // Handlers
  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedBlog("");
    setScrollInterupted(false);
    const response = await fetch(`${apiBaseUrl}/api/v1/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: formValues.topic,
        details: formValues.details,
        keywords: formValues.keywords,
      }),
    });

    if (!response.body) {
      setIsGenerating(false);
      return;
    }

    setGeneratedBlog("");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      setGeneratedBlog((prev) => prev + text);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBlog);
  };

  // Content Components
  const contents = [
    <BlogTopicForm
      formValues={formValues}
      setFormValues={setFormValues}
      handleGenerate={handleGenerate}
      isGenerating={isGenerating}
    />,
    <UnderDev name="Blog Structure" />,
    <UnderDev name="Blog Style" />,
    <UnderDev name="Blog Examples" />,
    <UnderDev name="Fact Checking" />,
    <UnderDev name="Finalize Blog Post" />,
  ];

  const useContent = (step: number) => {
    return step <= steps.length ? contents[step] : null;
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <Card className="flex flex-col">
          <GenerateWorkflow
            steps={steps}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
          />
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 h-full w-full overflow-y-hidden justify-between">
        <Card
          className={`flex flex-col ${
            expanded ? "lg:w-1/12 opacity-20" : "lg:w-1/3 opacity-100"
          } gap-2 h-full transition-all duration-300`}
          overrideDims={true}
        >
          <h2 className="text-lg font-semibold">
            {activeStep + 1}. {steps[activeStep]}
          </h2>
          <div className="w-full h-px bg-gray-700 "></div>
          <div className="flex flex-col  gap-2">
            <div className="mb-2 text-sm text-gray-400">
              Set the topic and details for your blog post.
            </div>
            {useContent(activeStep)}
          </div>
        </Card>
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
    </PageContainer>
  );
};
