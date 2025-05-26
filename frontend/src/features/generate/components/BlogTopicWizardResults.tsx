import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { BlockTopicWixardItem } from "./BlockTopicWixardItem";

export const BlogTopicWizardResults = ({
  content,
}: {
  content: BlogTopicWizardResultItem[];
}) => {
  return (
    <>
      {content.map((item, index) => (
        <BlockTopicWixardItem key={index} item={item} index={index} />
      ))}
    </>
  );
};
