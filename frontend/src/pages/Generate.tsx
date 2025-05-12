import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState } from "react";
import { ModelBadge } from "../features/models/ModelBadge";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogTopicForm } from "../features/generate/components/BlogTopicForm";

export const Generate = ({
  setShowModelList,
  currentModel,
  setCurrentModel,
}: {
  setShowModelList: (show: boolean) => void;
  currentModel: string;
  setCurrentModel: (model: string) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Blog Topic",
    "Blog Structure",
    "Blog Style",
    "Blog Examples",
    "Finalize Blog Post",
  ];
  const contents = [<BlogTopicForm />, <Card />, <Card />, <Card />, <Card />];

  const useContent = (step: number) => {
    return step <= steps.length ? contents[step] : null;
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <Card className="flex flex-col">
          <GenerateWorkflow
            steps={steps}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
          />
        </Card>
      </div>
      <div className="flex gap-4">
        <Card className="flex-col w-2/3 gap-2">
          <h2 className="text-lg font-semibold">
            {activeStep + 1}. {steps[activeStep]}
          </h2>
          <div className="h-px w-full bg-gray-700 "></div>
          <div className="flex flex-col gap-2 h-full">
            <div className="text-sm text-gray-400 mb-2">
              Set the topic and details for your blog post.
            </div>
            {useContent(activeStep)}
          </div>
        </Card>
        <Card className="flex flex-col w-1/3 gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Model Output</h2>
            <div className="flex flex-col">
              <ModelBadge
                activeModel={currentModel}
                onClick={() => setShowModelList(true)}
              />
            </div>
          </div>
          <div className="h-px w-full bg-gray-700 "></div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-400 mb-2">
              Your blog post will be generated here!
            </div>
            <BlogSkeleton />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
