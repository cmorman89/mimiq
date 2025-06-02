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
      <button
        className="text-2xl sm:text-4xl flex items-center justify-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200 cursor-pointer overflow-clip"
        onClick={() => handleOptionClick(true)}
      >
        <FaMagic className=" text-white hidden sm:block" />
        <div className="h-10 w-px bg-white mx-4 hidden sm:block" />
        <span className="text-white">
          Brainstorm <span className=" whitespace-nowrap">with AI</span>
        </span>
        <div className="flex items-center justify-center border-2 p-1 rounded-full">
          <FaArrowRight className="text-sm xl:text-xl text-white" />
        </div>
      </button>

      <button
        className="border-2 border-gray-700 text-xl flex items-center justify-center gap-4  text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => handleOptionClick(false)}
      >
        <span className="text-white">Manual Mode</span>
      </button>
    </div>
  );
};

export default BlogWizardSelection;
