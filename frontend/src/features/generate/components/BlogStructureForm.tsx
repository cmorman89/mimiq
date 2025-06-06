import { BlogStructure } from "./BlogStructure";
import { BlogStructureItemState } from "../../../context/BlogFormContext";
import { useEffect, useState } from "react";

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

  return <BlogStructure structure={structure} />;
};

export default BlogStructureForm;
