import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { BlogWizardItem } from "./BlogWizardItem";
import {
  BlogFormFieldIndex,
  useBlogForm,
} from "../../../context/BlogFormContext";

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
          key={index}
          item={item}
          index={index}
          handleItemOnClick={handleItemOnClick}
        />
      ))}
    </>
  );
};
