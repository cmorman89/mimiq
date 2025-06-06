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

  const handleSwapSections = (initiatorIndex: number, targetIndex: number) => {
    const initiator = document.getElementById(`section-${initiatorIndex}`);
    const target = document.getElementById(`section-${targetIndex}`);
    const newStructure = [...structure];
    const originalInitiator = newStructure[initiatorIndex];
    const originalTarget = newStructure[targetIndex];
    newStructure[initiatorIndex] = originalTarget;
    newStructure[targetIndex] = originalInitiator;

    if (initiator && target) {
      const initiatorRect = initiator.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const distance = targetRect.top - initiatorRect.top;

      // Apply transition styles
      initiator.style.transition = "transform 300ms ease-out";
      target.style.transition = "transform 300ms ease-out";

      // Apply transforms
      initiator.style.transform = `translateY(${distance}px)`;
      target.style.transform = `translateY(${-distance}px)`;

      // Update structure after animation completes
      setTimeout(() => {
        setStructure(newStructure);
        // Reset transforms and transitions
        initiator.style.transform = "";
        target.style.transform = "";
        initiator.style.transition = "";
        target.style.transition = "";
      }, 300);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BlogStructure
        structure={structure}
        handleRemoveSection={handleRemoveSection}
        handleSwapSections={handleSwapSections}
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
