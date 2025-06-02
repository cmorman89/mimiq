import { createContext } from "react";
import { BlogFormContextType } from "../BlogFormContext";

export const BlogFormContext = createContext<BlogFormContextType | undefined>(
  undefined
);
