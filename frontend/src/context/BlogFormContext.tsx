// BlogFormContext.tsx
// Context for the blog generation form
// Uses reducer composition to manage the form state
// - Idea reducer
// - Structure reducer
// - Style reducer
// - Example reducer

import { createContext, Dispatch, useContext, useReducer } from "react";

const initialState: BlogFormState = {
  idea: {
    topic: "",
    title: "",
    details: "",
    keywords: [],
  },
  structure: {
    length: 0,
    sections: [],
  },
  style: {
    tone: "",
    purpose: "",
    audience: "",
    formality: 0,
    persona: "",
  },
  example: {
    examples: [],
  },
};

// Main idea section
type BlogIdeaState = {
  topic: string;
  title: string;
  details: string;
  keywords: string[];
};

// Structure section
type BlogStructureItemState = {
  title: string;
  description: string;
  keywords: string[];
};

type BlogStructureState = {
  length: number;
  sections: BlogStructureItemState[];
};

// Style section
type BlogStyleState = {
  tone: string;
  purpose: string;
  audience: string;
  formality: number;
  persona: string;
};

// Example section
type BlogExampleState = {
  examples: string[];
};

// Main form state
type BlogFormState = {
  idea: BlogIdeaState;
  structure: BlogStructureState;
  style: BlogStyleState;
  example: BlogExampleState;
};

// Action types
type BlogFormAction = {
  type: "UPDATE_FIELD";
  payload: {
    field: keyof BlogFormState;
    subfield?: keyof BlogFormState[keyof BlogFormState];
    value: string | string[] | number;
  };
};

// Context type
type BlogFormContextType = {
  state: BlogFormState;
  dispatch: Dispatch<BlogFormAction>;
};

export const BlogFormContext = createContext<BlogFormContextType | undefined>(
  undefined
);

const blogFormReducer = (state: BlogFormState, action: BlogFormAction) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      if (action.payload.field && action.payload.subfield) {
        return {
          ...state,
          [action.payload.field]: {
            ...state[action.payload.field],
            [action.payload.subfield]: action.payload.value,
          },
        };
      }
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

export const BlogFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(blogFormReducer, initialState);

  return (
    <BlogFormContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogFormContext.Provider>
  );
};

export const useBlogForm = () => {
  const context = useContext(BlogFormContext);
  if (!context) {
    throw new Error("useBlogForm must be used within a BlogFormProvider");
  }
  return context;
};