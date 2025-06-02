import { useState } from "react";
import { BlogWizardSelection } from "./components/BlogWizardSelection";
import {
  BlogTopicWizardMenu,
} from "./components/BlogTopicWizardMenu";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { FaPencil, FaWandMagicSparkles } from "react-icons/fa6";

export const BlogFormPanel = ({
  activeStep,
  steps,
}: {
  activeStep: number;
  steps: {
    name: string;
    description: string;
    component: React.ReactNode;
  }[];
}) => {
  const [initialChoice, setInitialChoice] = useState(false);
  const [isWizard, setIsWizard] = useState(false);

  return (
    // Title and wizard switcher
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-lg font-semibold transition-all duration-300 ${initialChoice && !isWizard ? "opacity-100" : "opacity-0"}`}>
          {activeStep + 1}. {steps[activeStep].name}
        </h2>
        <Button
          type="primary"
          onClick={() => setIsWizard(!isWizard)}
          className={`text-xs text-gray-400 flex items-center gap-2 transition-all duration-300 ${
            initialChoice ? "opacity-100" : "opacity-0"
          }`}
          itemsRow={true}
        >
          {isWizard ? (
            <span className="flex items-center gap-2">
              <FaPencil className="my-1" /> Manual Mode
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaWandMagicSparkles className="my-1" /> Open Wizard
            </span>
          )}
        </Button>
      </div>
      <Divider className={`bg-gray-700 transition-all duration-300 ${initialChoice && !isWizard ? "opacity-100" : "opacity-0"}`} />
      <p className={`text-sm text-gray-400 transition-all duration-300 ${initialChoice && !isWizard ? "opacity-100" : "opacity-0"}`}>{steps[activeStep].description}</p>
      <div className="blog-form-container flex-col">
        {!initialChoice ? (
          <BlogWizardSelection
            setInitialChoice={setInitialChoice}
            setIsWizard={setIsWizard}
          />
        ) : isWizard ? (
          <BlogTopicWizardMenu />
        ) : (
          steps[activeStep].component
        )}
      </div>
    </div>
  );
};
