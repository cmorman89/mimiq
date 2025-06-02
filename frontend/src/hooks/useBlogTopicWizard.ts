import { useState, useEffect } from "react";
import {
  BlogTopicWizardMenuProps,
  BlogTopicWizardResultItem,
} from "../types/blog";

export const useBlogTopicWizard = (): BlogTopicWizardMenuProps => {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const [direction, setDirection] = useState<string>(() => {
    return localStorage.getItem("blogWizardDirection") || "";
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<string>(() => {
    return localStorage.getItem("blogWizardResult") || "";
  });
  const [ideas, setIdeas] = useState<BlogTopicWizardResultItem[]>(() => {
    const savedIdeas = localStorage.getItem("blogWizardIdeas");
    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogWizardDirection", direction);
  }, [direction]);

  useEffect(() => {
    localStorage.setItem("blogWizardResult", result);
  }, [result]);

  useEffect(() => {
    localStorage.setItem("blogWizardIdeas", JSON.stringify(ideas));
  }, [ideas]);

  const handleGenerate = async (direction: string = "") => {
    if (!direction) return;
    setIsGenerating(true);
    setDirection(direction);
    const response = await fetch(`${apiBaseUrl}/api/v1/generate/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direction: direction }),
    });
    const data = await response.json();
    setResult(data);
    setIdeas(data.content);
    setIsGenerating(false);
  };

  const handleClear = () => {
    setDirection("");
    setResult("");
    setIdeas([]);
  };

  return {
    direction,
    setDirection,
    isGenerating,
    result,
    ideas,
    handleGenerate,
    handleClear,
  };
};
