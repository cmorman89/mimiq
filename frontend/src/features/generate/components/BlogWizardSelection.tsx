import { Card } from "../../../components/Card";
import { FaList } from "react-icons/fa6";
import { FaArrowRight, FaMagic } from "react-icons/fa";

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
      <button className="text-4xl flex items-center justify-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
      onClick={() => handleOptionClick(true)}>
        <FaMagic className=" text-white" />
        <div className="h-10 w-px bg-white mx-4" />
        <span className="text-white">Brainstorm with AI</span>
        <div className="flex items-center justify-center border-2 p-1 rounded-full">
          <FaArrowRight className="text-sm xl:text-xl text-white" />
        </div>
      </button>



      <Card
        type="dark"
        padding="tight"
        className="flex items-center gap-4 transition-all duration-300 cursor-pointer hover:scale-105"
        onClick={() => handleOptionClick(false)}
      >
        <FaList className="text-4xl text-gray-400" />
        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-700">
          <h3 className="text-lg font-semibold">Manual Mode</h3>
          <p className="text-sm text-gray-400">
            I already have an idea in mind
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BlogWizardSelection;
