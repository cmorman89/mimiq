import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";
import { useState } from "react";

export const Generate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([
    "Blog Topic",
    "Blog Description",
    "Blog Tone",
    "Blog Audience",
    "Blog Length",
  ]);

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
          The active step is {activeStep + 1}: {steps[activeStep]}
        </Card>
        <Card className="flex-col w-1/3 gap-2">ddd</Card>
      </div>
    </PageContainer>
  );
};
