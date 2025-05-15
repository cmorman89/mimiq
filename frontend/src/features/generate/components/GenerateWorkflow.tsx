import { Stepper } from "../../../components/Stepper";

/**
 * A workflow management component that displays the current progress in the content generation process.
 *
 * Features:
 * - Step tracking and navigation
 * - Progress visualization
 * - Interactive step selection
 * - Consistent workflow state management
 *
 * This component provides a visual representation of the content generation workflow,
 * allowing users to track their progress and navigate between different stages
 * of the generation process.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.steps - Array of step names in the workflow
 * @param {number} props.activeIndex - Current active step index
 * @param {(index: number) => void} props.onStepChange - Callback when step is changed
 * @returns {JSX.Element} A workflow progress component
 */
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
