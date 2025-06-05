
import { FaXmark } from "react-icons/fa6";
import { useBannerContext } from "../context/useBannerMessage";

export const BannerMessage = ({
  message,
  type,
}: {
  message: string;
  type?: "error" | "warning" | "info" | "success";
}) => {
  const { state, handleCloseBanner } = useBannerContext();

  console.log(state);
  const getColor = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      default:
        return "bg-gray-700";
    }
  };

  const transitionClass = state.isBannerVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-full";
  const handleClose = () => {
    handleCloseBanner();
  };
  return (
    <div
      className={`absolute left-0 w-full z-50 navbar-offset transition-all duration-300 ${transitionClass}`}
    >
      <div
        className={`py-2 px-4 flex items-center justify-center h-full min-h-12 max-h-20 ${getColor()} rounded-lg mt-8 mx-auto max-w-6xl relative shadow-xl border border-white/10`}
      >
        <p className="text-sm text-white">{message || "Banner Message"}</p>
        <button
          onClick={handleClose}
          className="rounded-full bg-white/40 hover:bg-white/60 absolute right-4 p-1"
        >
          <FaXmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
