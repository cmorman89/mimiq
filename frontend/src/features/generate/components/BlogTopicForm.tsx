import { FaWandMagicSparkles } from "react-icons/fa6";
import { Card } from "../../../components/Card";
import { FaList, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../../../components/Button";

/**
 * A form component for generating blog content with topic selection and input options.
 *
 * Features:
 * - Two input modes: AI-assisted and manual entry
 * - Form fields for topic, details, and keywords
 * - Interactive input clearing
 * - Responsive layout
 * - Visual feedback for user interactions
 * - Gradient styling for AI-assisted mode
 *
 * This component provides a user interface for blog content generation,
 * allowing users to either get AI assistance in topic selection or
 * manually enter their blog details.
 *
 * @component
 * @returns {JSX.Element} A form component for blog topic generation
 */
export const BlogTopicForm = ({
  formValues,
  setFormValues,
  handleGenerate,
}: {
  formValues: {
    topic: string;
    details: string;
    keywords: string[];
  };
  setFormValues: (formValues: { topic: string; details: string; keywords: string[] }) => void;
  handleGenerate: () => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value.split(",").map((keyword) => keyword.trim()) });
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
            className="flex items-center gap-4 overflow-hidden transition-all duration-300 border-orange-700 cursor-pointer hover:scale-105 bg-orange-400/80 bg-gradient-to-r from-transparent to-rose-400/80"
            onClick={() => handleOptionClick("wizard")}
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
            onClick={() => handleOptionClick("manual")}
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
      ) : (
        <div className="flex flex-col w-full gap-4 px-4">
          <div className="flex flex-col gap-4">
            <Card
              type="dark"
              padding="tight"
              className="flex flex-col w-full gap-2"
            >
              <div className="flex items-center justify-between w-full gap-2 rounded-2xl">
                <label
                  htmlFor="topic"
                  className="text-sm text-gray-400 whitespace-nowrap min-w-20"
                >
                  Blog Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  placeholder="Enter blog topic"
                  className="w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600"
                  autoComplete="off"
                  value={formValues.topic}
                  onChange={(e) => handleInputChange(e)}
                />
                <div className="flex">
                  <FaTimes
                    className={`${
                      formValues.topic ? "opacity-100" : "opacity-0"
                    } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                    onClick={() => setFormValues({ ...formValues, topic: "" })}
                  />
                </div>
              </div>
            </Card>
            <Card
              type="dark"
              padding="tight"
              className="flex flex-col w-full gap-2"
            >
              <div className="flex items-center w-full gap-2 rounded-2xl">
                <label
                  htmlFor="details"
                  className="text-sm text-gray-400 whitespace-nowrap min-w-20"
                >
                  Details
                </label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  placeholder="Enter details (optional)"
                  className="w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600"
                  autoComplete="off"
                  value={formValues.details}
                  onChange={(e) => handleInputChange(e)}
                />
                <div className="flex">
                  <FaTimes
                    className={`${
                      formValues.details ? "opacity-100" : "opacity-0"
                    } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                    onClick={() =>
                      setFormValues({ ...formValues, details: "" })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card
              type="dark"
              padding="tight"
              className="flex flex-col w-full gap-2"
            >
              <div className="flex items-center w-full gap-2 rounded-2xl">
                <label
                  htmlFor="keywords"
                  className="text-sm text-gray-400 whitespace-nowrap min-w-20"
                >
                  Keywords
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  placeholder="Enter keywords separated by commas (optional)"
                  className="w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600"
                  autoComplete="off"
                  value={formValues.keywords.join(", ")}
                  onChange={(e) => handleKeywordChange(e)}
                />
                <div className="flex">
                  <FaTimes
                    className={`${
                      formValues.keywords.length > 0 ? "opacity-100" : "opacity-0"
                    } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                    onClick={() =>
                      setFormValues({ ...formValues, keywords: [] })
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
          <Button type="accent" className="w-full" onClick={handleGenerate}>
            Generate Blog
          </Button>
        </div>
      )}
    </div>
  );
};
