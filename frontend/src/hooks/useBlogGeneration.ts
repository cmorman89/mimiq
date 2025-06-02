import { useState } from "react";
import { BlogFormState } from "../context/BlogFormContext";

interface UseBlogGenerationReturn {
  generatedBlog: string;
  setGeneratedBlog: (blog: string) => void;
  isGenerating: boolean;
  handleGenerate: (state: BlogFormState) => Promise<void>;
  handleCopy: () => void;
}

export const useBlogGeneration = (): UseBlogGenerationReturn => {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const [generatedBlog, setGeneratedBlog] = useState<string>(() => {
    return localStorage.getItem("generatedBlog") || "";
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (state: BlogFormState) => {
    const { topic, details, keywords } = state.idea;

    setIsGenerating(true);
    setGeneratedBlog("");

    const response = await fetch(`${apiBaseUrl}/api/v1/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        details,
        keywords,
      }),
    });

    if (!response.body) {
      setIsGenerating(false);
      return;
    }

    setGeneratedBlog("");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      setGeneratedBlog((prev) => prev + text);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBlog);
  };

  return {
    generatedBlog,
    isGenerating,
    setGeneratedBlog,
    handleGenerate,
    handleCopy,
  };
};
