import { createContext } from "react";
import { BannerContextType } from "../BannerContext";

export const BannerContext = createContext<BannerContextType | undefined>(
  undefined
);
