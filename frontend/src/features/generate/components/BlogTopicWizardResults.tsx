import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { BlockTopicWixardItem } from "./BlockTopicWixardItem";

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
        <BlockTopicWixardItem
          key={index}
          item={item}
          index={index}
          handleItemOnClick={handleItemOnClick}
        />
      ))}
    </>
  );
};
