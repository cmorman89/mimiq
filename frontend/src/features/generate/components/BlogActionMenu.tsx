import { Button } from "../../../components/Button";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { BlogFormState, useBlogForm } from "../../../context/BlogFormContext";

export const BlogActionMenu = ({
  isGenerating,
  handleGenerate,
  setScrollInterupted,
  setActiveStep,
  activeStep,
}: {
  isGenerating: boolean;
  handleGenerate: (state: BlogFormState) => Promise<void>;
  setScrollInterupted: (scrollInterupted: boolean) => void;
  setActiveStep: (step: number) => void;
  activeStep: number;
}) => {
  const { state } = useBlogForm();

  const handleGenerateClick = () => {
    if (state.idea.topic === "" || isGenerating) {
      return;
    }
    setScrollInterupted(false);
    handleGenerate(state);
  };
  return (
    <div className="blog-form-container justify-between">
      {/* Generate Button */}
      <Button
        type={isGenerating ? "disabled" : "accent"}
        className={`w-full transition-all duration-300 ${
          state.idea.topic !== "" ? "opacity-100" : "opacity-0"
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
  );
};
