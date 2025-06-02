import { useContext } from "react";
import { BlogFormContext } from "./blog_form_context/createBlogFormContext";

export const useBlogForm = () => {
  const context = useContext(BlogFormContext);
  if (!context) {
    throw new Error("useBlogForm must be used within a BlogFormProvider");
  }
  return context;
};
