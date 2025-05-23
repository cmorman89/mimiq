import { useEffect, useState } from "react";

interface StepNodeProps {
  index: number;
  activeIndex: number;
  onClick: () => void;
  step: string;
}

interface StepLineProps {
  stepsCount: number;
  activeIndex: number;
}

interface StepperProps {
  steps: string[];
  activeIndex: number;
  onStepChange: (index: number) => void;
}

const STATUS_CLASSES = {
  active:
    "bg-rose-200 text-gray-800 border-orange-500 h-12 w-12 font-bold text-lg border-4",
  completed: "bg-gray-800 border-fuchsia-700 h-8 w-8 m-2 text-xs border-2",
  inactive: "bg-gray-950 border-gray-700 h-10 w-10 m-1 text-xs border-4",
} as const;

const NODE_GLOW =
  "hover:scale-110 shadow hover:shadow-[0_0_20px_rgba(235,97,0,0.8)]";

/**
 * A multi-step progress indicator component that shows the current position in a process.
 *
 * Features:
 * - Interactive step nodes with hover effects
 * - Progress line with gradient animation
 * - Step completion tracking
 * - Customizable step labels
 * - Responsive design
 * - Visual feedback for active, completed, and inactive states
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.steps - Array of step labels
 * @param {number} props.activeIndex - Current active step index
 * @param {(index: number) => void} props.onStepChange - Callback when step is changed
 * @returns {JSX.Element} A stepper component with progress tracking
 */
export const Stepper = ({
  steps = [],
  activeIndex = 0,
  onStepChange,
}: StepperProps) => {
  const handleStepClick = (index: number) => onStepChange(index);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="relative w-full">
        <StepLine stepsCount={steps.length} activeIndex={activeIndex} />
        <div className="flex justify-between items-start relative">
          {steps.map((step, index) => (
            <StepNode
              key={index}
              index={index}
              activeIndex={activeIndex}
              onClick={() => handleStepClick(index)}
              step={step}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Individual step node component within the stepper.
 *
 * Features:
 * - Dynamic state management (active, completed, inactive)
 * - Hover effects with scaling and glow
 * - Click interaction
 * - Step number and label display
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.index - Step index
 * @param {number} props.activeIndex - Current active step index
 * @param {() => void} props.onClick - Click handler for step selection
 * @param {string} props.step - Step label
 * @returns {JSX.Element} A step node component
 */
export const StepNode = ({
  index,
  activeIndex,
  onClick,
  step,
}: StepNodeProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsActive(activeIndex === index);
    setIsCompleted(activeIndex > index);
  }, [activeIndex, index]);

  const getStatusClass = () => {
    if (isActive) return STATUS_CLASSES.active;
    if (isCompleted) return STATUS_CLASSES.completed;
    return STATUS_CLASSES.inactive;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center overflow-visible gap-1 relative">
      <div
        className={`absolute top-5 bg-clip-content ${
          isActive ? "w-16" : "w-12"
        } h-2 z-0 transition-all duration-300 ${
          isHovering ? "scale-x-125" : "scale-x-100"
        }`}
      />
      <div
        className={`${NODE_GLOW} border cursor-pointer rounded-full items-center justify-center flex transition-all duration-300 z-10 bg-gradient-to-b from-purple-600/25 to-transparent ${getStatusClass()}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {index + 1}
      </div>
      <div
        className={`${
          isActive ? "text-white font-semibold" : "text-gray-400"
        } text-xs transition-all duration-300 text-center`}
      >
        {step}
      </div>
    </div>
  );
};

/**
 * Progress line component that connects steps in the stepper.
 *
 * Features:
 * - Dynamic width calculation based on progress
 * - Gradient background
 * - Smooth transitions
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.stepsCount - Total number of steps
 * @param {number} props.activeIndex - Current active step index
 * @returns {JSX.Element} A progress line component
 */
export const StepLine = ({ stepsCount, activeIndex }: StepLineProps) => {
  const [n, setN] = useState(0);
  const [d, setD] = useState(stepsCount - 1);

  const getProgressWidth = (numerator: number, denominator: number): string => {
    if (numerator === 0 || denominator === 0) return "w-0";
    if (numerator === denominator) return "w-full";
    return `w-[${(numerator / denominator) * 100}%]`;
  };

  useEffect(() => {
    setN(activeIndex);
    setD(stepsCount - 1);
  }, [activeIndex, stepsCount]);

  return (
    <div className="flex w-full justify-center">
      <div
        className={`absolute top-6 -translate-y-1/2 h-2 bg-gray-700 z-0 flex gap-0 ${getProgressWidth(
          d,
          d + 1
        )}`}
      >
        <div
          className={`${getProgressWidth(
            n,
            d
          )} h-2 bg-gradient-mimiq-30 transition-all duration-300`}
        />
      </div>
    </div>
  );
};
