// GlobalOverlayButtons.tsx
import { createPortal } from "react-dom";
import { FaCheck, FaChevronDown, FaChevronUp, FaCopy } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";

export const BlogOverlayButtons = ({
  isGenerating,
  scrollInterupted,
  setScrollInterupted,
  generatedBlog,
}: {
  isGenerating: boolean;
  scrollInterupted: boolean;
  setScrollInterupted: (scrollInterupted: boolean) => void;
  generatedBlog: string;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBlog);
    setIsCopied(true);
  };

  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const [copyVisible, setCopyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  useEffect(() => {
    if (generatedBlog.length > 1) {
      setCopyVisible(true);
    }
  }, [generatedBlog]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollUpVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return createPortal(
    <div className="lg:hidden">
      {isGenerating && scrollInterupted && (
        <div
          className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50  mr-2 opacity-50 hover:opacity-100 transition-opacity duration-300 aspect-square items-center justify-center rounded-full bg-gray-950/90 p-4"
          onClick={() => {
            setScrollInterupted(false);
          }}
        >
          <FaChevronDown className="text-3xl" />
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <Button
          type="primary"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setScrollInterupted(true);
            setScrollUpVisible(true);
          }}
          className={`${
            scrollUpVisible ? "opacity-50 hover:opacity-100" : "opacity-0"
          } transition-opacity duration-300 aspect-square items-center justify-center`}
        >
          <FaChevronUp className="text-base" />
        </Button>
        <Button
          type="primary"
          onClick={handleCopy}
          className={`${
            isCopied
              ? "opacity-100"
              : "opacity-50 hover:opacity-100 aspect-square"
            }  items-center justify-center transition-all duration-300
          ${!copyVisible && "opacity-0"}`}
        >
          <FaCopy className="text-base" />
          {isCopied && "Text Copied to Clipboard"}
        </Button>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};
