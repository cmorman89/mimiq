import { Stepper } from "../../../components/Stepper";

export const GenerateWorkflow = ({
  steps,
  activeIndex,
  onStepChange,
}: {
  steps: string[];
  activeIndex: number;
  onStepChange: (index: number) => void;
}) => {
  return (
    <div>
      <Stepper
        steps={steps}
        activeIndex={activeIndex}
        onStepChange={onStepChange}
      />
    </div>
  );
};
