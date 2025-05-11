import { Stepper } from "../../../components/Stepper";

export const GenerateWorkflow = ({ nodeArray }: { nodeArray: string[] }) => {
  return (
    <div>
      GenerateWorkflow
      <Stepper steps={nodeArray} />
    </div>
  );
};
