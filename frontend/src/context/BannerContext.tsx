import { Dispatch, useReducer } from "react";
import { BannerContext } from "./banner_context/createBannerFormContext";

export type BannerMessageType = {
  message: string;
  type?: "error" | "warning" | "info" | "success";
};

export type BannerContextType = {
  state: BannerState;
  dispatch: Dispatch<BannerAction>;
  handleSetBannerMessage: (message: BannerMessageType) => void;
  handleCloseBanner: () => void;
};

export type BannerState = {
  bannerMessage: string;
  bannerType: "error" | "warning" | "info" | "success";
  isBannerVisible: boolean;
};

export type BannerAction = {
  type: "SET_BANNER_MESSAGE" | "CLOSE_BANNER";
  payload: BannerMessageType;
  close?: boolean;
};

const initialState: BannerState = {
  bannerMessage: "",
  bannerType: "info",
  isBannerVisible: false,
};

const bannerReducer = (state: BannerState, action: BannerAction) => {
  switch (action.type) {
    case "SET_BANNER_MESSAGE":
        return {
        ...state,
        bannerMessage: action.payload.message,
        bannerType: action.payload.type || "info",
        isBannerVisible: true,
      };
    case "CLOSE_BANNER":
      return { ...state, isBannerVisible: false };
  }
};


  
export const BannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(bannerReducer, initialState);

  const handleSetBannerMessage = (message: BannerMessageType) => {
    dispatch({
      type: "SET_BANNER_MESSAGE",
      payload: {
        message: message.message,
        type: message.type || "info",
      },
    });
  };

  const handleCloseBanner = () => {
    dispatch({
      type: "CLOSE_BANNER",
      payload: {
        message: "",
        type: "info",
      },
    });
  };

  return (
    <BannerContext.Provider
      value={{ state, dispatch, handleSetBannerMessage, handleCloseBanner }}
    >
      {children}
    </BannerContext.Provider>
  );
};
