import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { BlogWizardItem } from "./BlogWizardItem";

export const BlogTopicWizardResults = ({
  content,
  handleItemOnClick,
}: {
  content: BlogTopicWizardResultItem[];
  handleItemOnClick: (
    item: BlogTopicWizardResultItem,
    label: keyof BlogTopicWizardResultItem
  ) => void;
}) => {
  return (
    <>
      {content.map((item, index) => (
        <BlogWizardItem
          key={index}
          item={item}
          index={index}
          handleItemOnClick={handleItemOnClick}
        />
      ))}
    </>
  );
};
