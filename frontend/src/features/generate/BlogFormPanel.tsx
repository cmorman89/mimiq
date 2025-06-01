import { useState } from "react";
import { BlogWizardSelection } from "./components/BlogWizardSelection";
import {
  BlogTopicWizardMenu,
  BlogTopicWizardResultItem,
} from "./components/BlogTopicWizardMenu";
import { useBlogForm } from "../../context/BlogFormContext";

export const BlogFormPanel = ({ children }: { children?: React.ReactNode }) => {
  const [initialChoice, setInitialChoice] = useState(false);
  const [isWizard, setIsWizard] = useState(false);
  const { state, handleUpdateField } = useBlogForm();

  const handleItemOnClick = (
    item: BlogTopicWizardResultItem,
    label: keyof BlogTopicWizardResultItem
  ) => {
    handleUpdateField("idea", label, item[label]);
  };

  return (
    // Title and wizard switcher
    <div className="flex flex-col gap-4">
      {!initialChoice ? (
        <BlogWizardSelection
          setInitialChoice={setInitialChoice}
          setIsWizard={setIsWizard}
        />
      ) : isWizard ? (
        <BlogTopicWizardMenu handleItemOnClick={handleItemOnClick} />
      ) : (
        children
      )}
    </div>
  );
};
