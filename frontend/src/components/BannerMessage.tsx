import { FaXmark } from "react-icons/fa6";
import { useBannerContext } from "../context/useBannerMessage";
import { useEffect, useState } from "react";

export const BannerMessage = ({
  message,
  type,
  persistent = false,
}: {
  message: string;
  type?: "error" | "warning" | "info" | "success";
  persistent?: boolean;
}) => {
  const { state, handleCloseBanner } = useBannerContext();
  const [messageKey, setMessageKey] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  // Close banner after 5 seconds if not persistent
  useEffect(() => {
    setIsHidden(false);
    setMessageKey((prev) => prev + 1);
    if (!persistent && state.isBannerVisible) {
      setTimeout(() => {
        handleCloseBanner();
        setTimeout(() => {
          setIsHidden(true);
        }, 300);
      }, 5000);
    }
  }, [persistent, handleCloseBanner, state.isBannerVisible]);

  const getColor = () => {
    switch (type) {
      case "error":
        return "bg-red-700";
      case "warning":
        return "bg-yellow-700";
      case "info":
        return "bg-gray-700";
      case "success":
        return "bg-green-900";
      default:
        return "bg-gray-700";
    }
  };

  const transitionClass = state.isBannerVisible
    ? "opacity-100 translate-y-0"
    : "opacity-10 -translate-y-full";

  const handleClose = () => {
    handleCloseBanner();
    setTimeout(() => {
      setIsHidden(true);
    }, 300);
  };
  return (
    <div
      className={`fixed flex flex-col w-full z-50 navbar-offset transition-all duration-300 ${transitionClass} px-4 mt-8 max-w-xl left-0 right-0 mx-auto ${
        isHidden ? "hidden" : ""
      }`}
    >
      {!persistent && (
        <div
          className={`flex items-center gap-2 w-full rounded-t-lg ${getColor()} border border-b-0 border-white/30 pt-1 px-2 pr-8 mx-auto max-w-6xl`}
        >
          <div className="flex w-full border border-white/40 bg-white/20 rounded-full p-0.5">
            <div
              key={messageKey}
              className={`flex w-full ${
                !persistent ? "progress-bar" : ""
              } h-3 bg-white/50 rounded-full`}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`py-2 px-4 flex flex-col w-full items-center justify-center h-full min-h-12 max-h-20 ${getColor()} rounded-lg mx-auto max-w-6xl relative shadow-xl border border-white/30 ${
          !persistent ? "rounded-t-none border-t-0" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm text-white">
            {message || "Test, Timed Banner Message"}
          </p>
        </div>
      </div>
      <button
        onClick={handleClose}
        className={`rounded-full bg-white/40 hover:bg-white/20 absolute border border-white/40 ${
          persistent ? "top-3 p-1.5" : "top-1.5 p-0.5"
        } right-6`}
      >
        <FaXmark className={`${persistent ? "w-4 h-4" : "w-3 h-3"}`} />
      </button>
    </div>
  );
};
