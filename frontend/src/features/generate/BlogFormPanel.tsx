import { useState } from "react";
import { BlogWizardSelection } from "./components/BlogWizardSelection";
import {
  BlogTopicWizardMenu,
  BlogTopicWizardResultItem,
} from "./components/BlogTopicWizardMenu";
import { useBlogForm } from "../../context/BlogFormContext";
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
  const { handleUpdateField } = useBlogForm();

  const handleItemOnClick = (
    item: BlogTopicWizardResultItem,
    label: keyof BlogTopicWizardResultItem
  ) => {
    handleUpdateField("idea", label, item[label]);
  };

  return (
    // Title and wizard switcher
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {activeStep + 1}. {steps[activeStep].name}
        </h2>
        <Button
          type="primary"
          onClick={() => setIsWizard(!isWizard)}
          className="text-xs text-gray-400 flex items-center gap-2"
          itemsRow={true}
        >
          {isWizard ? (
            <>
              <FaPencil className="my-1" /> Manual Mode
            </>
          ) : (
            <>
              <FaWandMagicSparkles className="my-1" /> Open Wizard
            </>
          )}
        </Button>
      </div>
      <Divider className="bg-gray-700" />
      <p className="text-sm text-gray-400">{steps[activeStep].description}</p>
      <div className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-full xl:px-4 mx-auto">
        {!initialChoice ? (
          <BlogWizardSelection
            setInitialChoice={setInitialChoice}
            setIsWizard={setIsWizard}
          />
        ) : isWizard ? (
          <BlogTopicWizardMenu handleItemOnClick={handleItemOnClick} />
        ) : (
          steps[activeStep].component
        )}
      </div>
    </div>
  );
};
