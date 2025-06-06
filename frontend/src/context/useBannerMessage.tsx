import { useContext } from "react";
import { BannerContext } from "./banner_context/createBannerFormContext";

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBannerMessage must be used within a BannerProvider");
  }
  return context;
};
 