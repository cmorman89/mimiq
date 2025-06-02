import { Card } from "../../../components/Card";
import { FaTimes } from "react-icons/fa";
import { useBlogForm } from "../../../context/BlogFormContext";

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
export const BlogTopicForm = () => {
  const { state, handleUpdateField } = useBlogForm();




  return (
    <div className={`flex flex-col ${"items-center justify-center"} h-full`}>
      <div className="flex flex-col w-full gap-4">
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
                value={state.idea.topic}
                onChange={(e) =>
                  handleUpdateField("idea", "topic", e.target.value)
                }
              />
              <div className="flex">
                <FaTimes
                  className={`${
                    state.idea.topic ? "opacity-100" : "opacity-0"
                  } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                  onClick={() => handleUpdateField("idea", "topic", "")}
                />
              </div>
            </div>
          </Card>
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
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter blog title"
                className="w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600"
                autoComplete="off"
                value={state.idea.title}
                onChange={(e) =>
                  handleUpdateField("idea", "title", e.target.value)
                }
              />
              <div className="flex">
                <FaTimes
                  className={`${
                    state.idea.title ? "opacity-100" : "opacity-0"
                  } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                    onClick={() => handleUpdateField("idea", "title", "")}
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
                value={state.idea.details}
                onChange={(e) =>
                  handleUpdateField("idea", "details", e.target.value)
                }
              />
              <div className="flex">
                <FaTimes
                  className={`${
                    state.idea.details ? "opacity-100" : "opacity-0"
                  } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                  onClick={() => handleUpdateField("idea", "details", "")}
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
                value={state.idea.keywords.join(", ")}
                onChange={(e) =>
                  handleUpdateField("idea", "keywords", e.target.value)
                }
              />
              <div className="flex">
                <FaTimes
                  className={`${
                    state.idea.keywords.length > 0 ? "opacity-100" : "opacity-0"
                  } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                  onClick={() => handleUpdateField("idea", "keywords", [])}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
