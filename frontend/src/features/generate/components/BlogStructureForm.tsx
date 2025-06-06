import { BlogStructure } from "./BlogStructure";
import { BlogStructureItemState } from "../../../context/BlogFormContext";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { FaPlus, FaTrash } from "react-icons/fa";

export const BlogStructureForm = () => {
  const [structure, setStructure] = useState<BlogStructureItemState[]>([]);
  const dummySectionOne: BlogStructureItemState = {
    title: "Introduction",
    description: "This is the introduction of the blog post.",
    keywords: ["one", "two", "three"],
  };

  const dummySectionTwo: BlogStructureItemState = {
    title: "Body",
    description: "This is the body of the blog post.",
    keywords: [],
  };

  const dummySectionThree: BlogStructureItemState = {
    title: "Conclusion",
    description: "This is the conclusion of the blog post.",
    keywords: [],
  };

  const dummyStructure: BlogStructureItemState[] = [
    dummySectionOne,
    dummySectionTwo,
    dummySectionThree,
  ];

  useEffect(() => {
    setStructure(dummyStructure);
  }, []);

  const handleAddSection = () => {
    setStructure([...structure, dummySectionOne]);
  };

  const handleRemoveSection = (index: number) => {
    setStructure(structure.filter((_, i) => i !== index));
  };

  const handleClearAllSections = () => {
    setStructure([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <BlogStructure
        structure={structure}
        handleRemoveSection={handleRemoveSection}
      />
      <div className="flex gap-4 justify-end">
        <Button onClick={handleAddSection}>
          <div className="flex items-center gap-2">
            <FaPlus className="text-white" />
            Add Section
          </div>
        </Button>
        <Button onClick={handleClearAllSections} type="danger">
          <div className="flex items-center gap-2">
            <FaTrash className="text-white" />
            Clear
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BlogStructureForm;
