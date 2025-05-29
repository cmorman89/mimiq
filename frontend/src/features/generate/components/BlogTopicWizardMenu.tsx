import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { FaTimes } from "react-icons/fa";
import { BlogTopicWizardResults } from "./BlogTopicWizardResults";

export interface BlogTopicWizardResultItem {
  topic: string;
  title: string;
  details: string;
  sections: string[];
  keywords: string[];
}

export const useBlogTopicWizard = () => {
  const [direction, setDirection] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [ideas, setIdeas] = useState<BlogTopicWizardResultItem[]>([]);
  
  const apiEndpoint = "http://localhost:8000/api/v1/generate/topics";
  const handleGenerate = async (direction: string = "") => {
    setIsGenerating(true);
    setDirection(direction);
    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({ direction }),
    });
    const data = await response.json();
    setResult(data);
    setIsGenerating(false);
  };

  const parseResult = (result: string) => {
    try {
      const parsedResult = JSON.parse(result);
      setIdeas(parsedResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    parseResult(result);
  }, [result]);

  return {
    direction,
    setDirection,
    isGenerating,
    result,
    ideas,
    handleGenerate,
  };
}

export const BlogTopicWizardMenu = () => {
  const example_result = {
    content: [
      {
        topic: "Heat Illness Prevention",
        title:
          "Staying Safe in the Phoenix Heat: Heat Illness Prevention for Memorial Day Weekend",
        details:
          "Learn essential tips to prevent heat-related illnesses during Phoenix’s intense Memorial Day Weekend celebrations. This post covers warning signs, hydration tips, and how to recognize and respond to heat exhaustion and heat stroke.",
        sections: [
          "Recognizing Heat Illness Symptoms",
          "Prevention Strategies for Heat Safety",
          "Emergency Steps If Someone Overheats",
        ],
        keywords: [
          "heat illness",
          "hydration",
          "heat exhaustion",
          "heat stroke",
          "summer safety",
        ],
      },
      {
        topic: "Hydration Tips in Phoenix Heat",
        title:
          "Beat the Heat: Hydration Tips for Spending Memorial Day Weekend in Phoenix",
        details:
          "Proper hydration is crucial when celebrating Memorial Day weekend in hot climates like Phoenix. Discover easy ways to stay hydrated, what drinks to avoid, and how hydration helps prevent heat-related dangers.",
        sections: [
          "Best Drinks to Stay Hydrated",
          "Hydration Timing and Amounts",
          "Signs of Dehydration to Watch For",
        ],
        keywords: [
          "hydration",
          "dehydration",
          "summer heat",
          "memorial day",
          "Phoenix weather",
        ],
      },
      {
        topic: "Safe Outdoor Activities",
        title:
          "Enjoying Memorial Day Outdoors Safely in Phoenix Heat: Best Practices and Activity Tips",
        details:
          "Make the most of your Memorial Day celebrations outdoors by embracing safer activities and optimal timing. Find out which events or games are cooler and safer, plus how to schedule your day to avoid peak heat hours.",
        sections: [
          "Choosing Heat-Friendly Activities",
          "Timing and Location Considerations",
          "Using Shade and Cooling Equipment",
        ],
        keywords: [
          "outdoor safety",
          "heat waves",
          "summertime fun",
          "Phoenix",
          "sun protection",
        ],
      },
      {
        topic: "Memorial Day Workouts and Heat Risks",
        title:
          "Avoiding Heat Illness During Memorial Day Holiday Workouts in Phoenix",
        details:
          "For those staying active over Memorial Day weekend, learn how to modify exercise routines safely in extreme heat. Tips include how to reduce exertion, pick ideal workout times, and recognize early signs of heat stress while exercising.",
        sections: [
          "Modifying Workout Intensity",
          "Best Times To Exercise",
          "Heat Distress Warning Signs",
        ],
        keywords: [
          "exercise safety",
          "heat illness prevention",
          "summer workouts",
          "Phoenix summers",
          "hydration",
        ],
      },
      {
        topic: "First Aid for Heat-Related Disorders",
        title:
          "Quick First Aid Responses for Heat-Related Illness During Phoenix Memorial Day Festivities",
        details:
          "Heat-related injuries require prompt response. Understand immediate first aid steps you can administer to someone suffering from heat exhaustion or heat stroke at Memorial Day events before professional help arrives.",
        sections: [
          "Heat Exhaustion First Aid",
          "Treatment for Heat Stroke Symptoms",
          "When to Call Emergency Services",
        ],
        keywords: [
          "first aid",
          "heat stroke",
          "heat exhaustion",
          "emergency response",
          "summer events",
        ],
      },
    ],
  };

  const useBlogTopicWizard = () => {
    const [direction, setDirection] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [ideas, setIdeas] = useState<BlogTopicWizardResultItem[]>([]);

    const handleGenerate = (direction: string = "") => {
      console.log(direction);
      setResult(example_result.content.toString());
    };

    const parseResult = (result: string) => {
      try {
        const parsedResult = JSON.parse(result);
        setIdeas(parsedResult);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      parseResult(result);
    }, [result]);

    return {
      direction,
      setDirection,
      result,
      ideas,
      handleGenerate,
    };
  };

  // const { direction, setDirection, result, ideas, handleGenerate } =
  //   useBlogTopicWizard();

  const { direction, setDirection } =
    useBlogTopicWizard();
  return (
    <div className="flex flex-col w-full gap-2 lg:p-2 max-w-3xl mx-auto">
         <div className="flex items-center justify-between w-full gap-2">
        {/*
          <h3 className="text-lg font-semibold">Blog Topic Wizard</h3>
          <div className="flex items-center gap-2">
            <Button type="primary">Generate</Button>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between w-full gap-2 rounded-2xl">
            <h4 className="text-sm font-semibold">Blog Topic Wizard</h4>
            <p className="text-sm text-gray-400">
              This is a wizard that will help you generate a blog topic.
            </p>
          </div> */}
          <Card
            type="dark"
            padding="tight"
            className="flex flex-col w-full gap-2"
          >
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 rounded-2xl min-h-20">
              <label
                htmlFor="topic"
                className="text-sm text-gray-400 whitespace-nowrap min-w-20 pt-2"
              >
                Have a direction?
              </label>
              <div className="flex flex-1">
                <textarea
                  id="direction"
                  name="direction"
                  placeholder="Enter a direction for the blog topic"
                  className="h-full w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600 min-h-18 border border-gray-800"
                  rows={4}
                  autoComplete="off"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                />
              </div>
              <div className="flex">
                <FaTimes
                  className={`${
                    direction ? "opacity-100" : "opacity-0"
                  } text-gray-400 text-sm cursor-pointer transition-all duration-300`}
                  onClick={() => setDirection("")}
                />
              </div>
            </div>
          </Card>
        </div>
      <BlogTopicWizardResults content={example_result.content} />
    </div>
  );
};
