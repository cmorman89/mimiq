import { FaWandMagicSparkles } from "react-icons/fa6";
import { Card } from "../../../components/Card";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../../../components/Button";

export const BlogTopicForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <div
      className={`flex flex-col ${
        selectedOption === ""
          ? "items-center justify-center"
          : "items-start justify-start"
      } h-full`}
    >
      {selectedOption === "" ? (
        <div className="flex flex-col gap-4 px-4">
          <Card
            type="dark"
            padding="tight"
            className="flex gap-4 items-center hover:scale-105 transition-all duration-300 cursor-pointer bg-orange-400/80 bg-gradient-to-r from-transparent to-rose-400/80 border-orange-700"
            onClick={() => handleOptionClick("wizard")}
          >
            <FaWandMagicSparkles className="text-rose-950 text-4xl" />
            <div className="flex flex-col gap-1 border-l-2 border-rose-900 pl-4">
              <h3 className="text-xl font-semibold text-rose-950">
                Help Me Decide
              </h3>
              <p className="text-rose-950 text-sm">
                Use AI to generate topics and keywords
              </p>
            </div>
          </Card>

          <Card
            type="dark"
            padding="tight"
            className="flex gap-4 items-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleOptionClick("manual")}
          >
            <FaList className="text-gray-400 text-4xl" />
            <div className="flex flex-col gap-1 border-l-2 border-gray-700 pl-4">
              <h3 className="text-lg font-semibold">I Have a Topic</h3>
              <p className="text-gray-400 text-sm">
                I have a topic and keywords in mind
              </p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4 w-full">
          <div className="flex flex-col gap-4">
            <Card type="dark" padding="tight" className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center rounded-2xl w-full justify-between">
                <label
                  htmlFor="topic"
                  className="text-sm text-gray-400 whitespace-nowrap min-w-20"
                >
                  Blog Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  placeholder="Enter blog topic"
                  className="text-sm text-gray-400 bg-transparent rounded-md p-2 outline-none w-full placeholder:text-gray-600"
                />
              </div>
            </Card>
            <Card type="dark" padding="tight" className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center rounded-2xl w-full">
                <label
                  htmlFor="details"
                className="text-sm text-gray-400 whitespace-nowrap min-w-20"
              >
                Details
              </label>
              <input
                type="text"
                id="details"
                placeholder="Enter details (optional)"
                className="text-sm text-gray-400 bg-transparent rounded-md p-2 outline-none w-full placeholder:text-gray-600"
              />
              </div>
            </Card>

            <Card type="dark" padding="tight" className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center rounded-2xl w-full">
                <label
              htmlFor="keywords"
              className="text-sm text-gray-400 whitespace-nowrap min-w-20"
            >
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              placeholder="Enter keywords separated by commas (optional)"
              className="text-sm text-gray-400 bg-transparent rounded-md p-2 outline-none w-full placeholder:text-gray-600"
                />
              </div>
            </Card>
          </div>
          <Button type="accent" className="w-full">
            Generate Blog
          </Button>
        </div>
      )}
    </div>
  );
};
