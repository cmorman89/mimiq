import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { BlogWizardItem } from "./BlogWizardItem";
import { useBlogForm } from "../../../context/useBlogFormContext";
import { BlogFormFieldIndex } from "../../../context/BlogFormContext";

export const BlogTopicWizardResults = ({
  content,
}: {
  content: BlogTopicWizardResultItem[];
}) => {
  const { handleUpdateField } = useBlogForm();

  const handleItemOnClick = (
    item: BlogTopicWizardResultItem,
    fieldIndex: BlogFormFieldIndex
  ) => {
    handleUpdateField(
      fieldIndex.field,
      fieldIndex.subfield,
      item[fieldIndex.subfield as keyof BlogTopicWizardResultItem]
    );
  };
  return (
    <>
      {content.map((item, index) => (
        <BlogWizardItem
          key={item.topic}
          item={item}
          index={index}
          handleItemOnClick={handleItemOnClick}
        />
      ))}
    </>
  );
};
