import { UnderDev } from "../../components/UnderDev";
import { BlogStructureForm } from "./components/BlogStructureForm";
import { BlogTopicForm } from "./components/BlogTopicForm";

export interface Step {
  name: string;
  description: string;
  component: React.ReactNode;
}

export const steps: Step[] = [
  {
    name: "Blog Topic",
    description: "Set the topic and details for your blog post.",
    component: <BlogTopicForm />,
  },
  {
    name: "Blog Structure",
    description: "Define the structure of your blog post.",
    component: <BlogStructureForm />,
  },
  {
    name: "Blog Style",
    description: "Define the style of your blog post.",
    component: <UnderDev name="Blog Style" />,
  },
  {
    name: "Blog Examples",
    description: "Provide writing examples for your blog post.",
    component: <UnderDev name="Blog Examples" />,
  },
  {
    name: "Fact Checking",
    description: "Fact check the content of your blog post.",
    component: <UnderDev name="Fact Checking" />,
  },
  {
    name: "Finalize Blog Post",
    description: "Finalize the content of your blog post.",
    component: <UnderDev name="Finalize Blog Post" />,
  },
];
