import { Button } from "../../../components/Button";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useBlogForm } from "../../../context/BlogFormContext";

export const BlogActionMenu = ({
  isGenerating,
  handleGenerateClick,
  setActiveStep,
  activeStep,
}: {
  isGenerating: boolean;
  handleGenerateClick: () => void;
  setActiveStep: (step: number) => void;
  activeStep: number;
}) => {
  const { state } = useBlogForm();

  return (
    <div className="flex justify-between items-center gap-4 ">
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
