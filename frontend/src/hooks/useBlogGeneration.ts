import { useState } from "react";

interface FormValues {
  topic: string;
  details: string;
  keywords: string[];
}

interface UseBlogGenerationReturn {
  generatedBlog: string;
  isGenerating: boolean;
  handleGenerate: (formValues: FormValues) => Promise<void>;
  handleCopy: () => void;
}

export const useBlogGeneration = (): UseBlogGenerationReturn => {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const [generatedBlog, setGeneratedBlog] = useState<string>(() => {
    return localStorage.getItem("generatedBlog") || "";
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (formValues: FormValues) => {
    setIsGenerating(true);
    setGeneratedBlog("");

    const response = await fetch(`${apiBaseUrl}/api/v1/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: formValues.topic,
        details: formValues.details,
        keywords: formValues.keywords,
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
    handleGenerate,
    handleCopy,
  };
};
