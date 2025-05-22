import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { toTitleCase } from "../utils/stringUtils";
import React from "react";

/**
 * The Utilities page component that provides a Mad Libs story generator.
 *
 * Features:
 * - Interactive Mad Libs story generation
 * - Dynamic placeholder parsing
 * - Real-time input handling
 * - Story reveal functionality
 * - Story reset capability
 * - Formatted story display
 * - Split-pane layout
 * - Input validation and formatting
 *
 * This page implements a Mad Libs generator that allows users to:
 * 1. View a story template with placeholders
 * 2. Fill in words for each placeholder
 * 3. Reveal the complete story with their inputs
 * 4. Reset and start over
 *
 * The story is formatted with proper paragraph breaks and styled placeholders
 * for better readability and visual appeal.
 *
 * @component
 * @returns {JSX.Element} The Mad Libs generator page with input form and story display
 */
export const Utilities = () => {
  const [madLib, setMadLib] = useState<string>("");

  const placeholderRegex = /\[(.*?)\]/g;
  const [parts, setParts] = useState<{ value: string; type: string }[]>([]);
  const [story, setStory] = useState<{ value: string; type: string }[]>([]);
  const [storyRevealed, setStoryRevealed] = useState<boolean>(false);

  setMadLib(
    "The day started like any other: I wrestled myself out of bed, narrowly avoiding a [PLURAL NOUN] attack from under the covers. My dog, a creature of pure [ADJECTIVE] energy, sensed impending doom—I mean, a walk—and began to [VERB ENDING IN -ING] at an alarming rate. We leashed up and headed toward the park, only to be confronted by the neighborhood's biggest obstacle: Mrs. Higgins' prize-winning [TYPE OF BIRD].\n\nThis bird, armed with a gaze that could curdle milk and a vocabulary consisting solely of surprisingly accurate insults, always made our journey a challenge. Today was no different. It squawked, I gulped, and my dog, forgetting all prior training, began attempting to perform [A DIFFICULT ATHLETIC FEAT]. The leash slipped, my shoes went [COLOR], and for a brief, shining moment, I considered running away and becoming a professional [OCCUPATION].\n\nBut then, a miracle! A rogue gust of wind snatched Mrs. Higgins' toupee, depositing it squarely on the bird's head. The bird, utterly humiliated, retreated in a flurry of feathers. My dog and I exchanged a look of pure, unadulterated [EMOTION], picked up my [ITEM OF CLOTHING], and finished our walk in relative peace, occasionally looking over our shoulders, half-expecting a feathered reign of terror to begin anew, possibly involving drones."
  );
  useEffect(() => {
    const parseMadLib = (madLib: string) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = placeholderRegex.exec(madLib)) !== null) {
        const [placeholder, type] = match;
        const index = match.index;
        if (lastIndex < index) {
          parts.push({
            value: madLib.slice(lastIndex, index),
            type: "text",
          });
        }
        parts.push({
          type: "blank",
          value: type,
        });
        lastIndex = index + placeholder.length;
      }

      if (lastIndex < madLib.length) {
        parts.push({
          value: madLib.slice(lastIndex),
          type: "text",
        });
      }
      return parts;
    };

    const parts = parseMadLib(madLib);
    setParts(parts);
    setStory(
      parts.map((part) => ({
        ...part,
        value: part.type === "blank" ? "" : part.value,
      }))
    );
  }, [madLib]);

  const revealStory = () => {
    setStoryRevealed(true);
  };

  const resetStory = () => {
    setStory(
      parts.map((part) => ({
        ...part,
        value: part.type === "blank" ? "" : part.value,
      }))
    );
    setStoryRevealed(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const newStory = [...story];
    newStory[index].value = value;
    setStory(newStory);
  };

  const formatStory = (story: { value: string; type: string }[]) => {
    const formattedStory = story.map((piece) =>
      piece.type === "blank" ? (
        <span className="text-orange-300 italic underline font-base">
          {piece.value}
        </span>
      ) : (
        piece.value
      )
    );
    return formattedStory.reduce((paragraphs: React.ReactElement[], piece) => {
      const lastParagraph = paragraphs[
        paragraphs.length - 1
      ] as React.ReactElement<{ children: React.ReactNode }>;
      if (!lastParagraph) {
        return [<p key={0}>{piece}</p>];
      }

      if (typeof piece === "string" && piece.includes("\n")) {
        const [current, ...rest] = piece.split("\n");
        const lastParagraphChildren = React.Children.toArray(
          lastParagraph.props.children
        );
        return [
          ...paragraphs.slice(0, -1),
          <p key={paragraphs.length - 1}>
            {[...lastParagraphChildren, current]}
          </p>,
          ...rest.map((text, i) => <p key={paragraphs.length + i}>{text}</p>),
        ];
      }

      const lastParagraphChildren = React.Children.toArray(
        lastParagraph.props.children
      );
      return [
        ...paragraphs.slice(0, -1),
        <p key={paragraphs.length - 1}>{[...lastParagraphChildren, piece]}</p>,
      ];
    }, []);
  };

  return (
    <PageContainer>
      <div>
        <Card>
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto ">
            <h1>Mad Libs Generator</h1>
            <p>
              Mad Libs is a word game where players fill in blanks with random
              words to create a story.
            </p>
            <Button>Generate</Button>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-132">
                {parts.map((part, index) =>
                  part.type === "blank" ? (
                    <div
                      key={index}
                      className="flex gap-2 bg-white/10 rounded-md px-2 py-1"
                    >
                      <span>{index}.</span>
                      <span className="w-1/4 min-w-40 text-white/80 text-sm text-right">
                        {toTitleCase(part.value)}:
                      </span>
                      <input
                        type="text"
                        className="outline-none bg-transparent w-full"
                        value={story[index].value}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        autoComplete="off"
                        aria-autocomplete="none"
                      />
                    </div>
                  ) : null
                )}
                <Button type="accent" onClick={revealStory}>
                  Reveal Story
                </Button>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Card
                  type="dark"
                  padding="tight"
                  className="flex flex-col gap-4 flex-1 font-light text-lg tracking-wide leading-relaxed"
                >
                  {storyRevealed
                    ? formatStory(story)
                    : "Your story will go here!"}
                </Card>
                <Button onClick={resetStory}>Reset Story</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
