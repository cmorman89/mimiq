import { Card } from "../../../components/Card";
import { FaList, FaWandMagicSparkles } from "react-icons/fa6";

export const BlogWizardSelection = ({
  setInitialChoice,
  setIsWizard,
}: {
  setInitialChoice: (initialChoice: boolean) => void;
  setIsWizard: (isWizard: boolean) => void;
}) => {
  const handleOptionClick = (wizard: boolean = false) => {
    setInitialChoice(true);
    setIsWizard?.(wizard);
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <Card
        type="dark"
        padding="tight"
        className="flex items-center gap-4 overflow-hidden transition-all duration-300 border-orange-700 cursor-pointer hover:scale-105 bg-orange-400/80 bg-gradient-to-r from-transparent to-rose-400/80"
        onClick={() => handleOptionClick(true)}
      >
        <FaWandMagicSparkles className="text-4xl text-rose-950" />
        <div className="flex flex-col gap-1 pl-4 overflow-hidden border-l-2 border-rose-900">
          <h3 className="text-xl font-semibold text-rose-950">
            Help Me Decide
          </h3>
          <p className="text-sm text-rose-950">
            Use AI to generate topics and keywords (Coming Soon)
          </p>
        </div>
      </Card>

      <Card
        type="dark"
        padding="tight"
        className="flex items-center gap-4 transition-all duration-300 cursor-pointer hover:scale-105"
        onClick={() => handleOptionClick(false)}
      >
        <FaList className="text-4xl text-gray-400" />
        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-700">
          <h3 className="text-lg font-semibold">I Have a Topic</h3>
          <p className="text-sm text-gray-400">
            I have a topic and keywords in mind
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BlogWizardSelection;
