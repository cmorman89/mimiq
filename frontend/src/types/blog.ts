export interface FormValues {
  topic: string;
  title: string;
  details: string;
  keywords: string[];
  sections: string[];
}

export interface BlogTopicWizardResultItem {
  topic: string;
  title: string;
  details: string;
  sections: string[];
  keywords: string[];
}

export interface BlogTopicWizardMenuProps {
  direction: string;
  setDirection: (direction: string) => void;
  isGenerating: boolean;
  result: string;
  ideas: BlogTopicWizardResultItem[];
  handleGenerate: (direction: string) => void;
  handleClear: () => void;
}