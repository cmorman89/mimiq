// BlogFormContext.tsx
// Context for the blog generation form
// Uses reducer composition to manage the form state
// - Idea reducer
// - Structure reducer
// - Style reducer
// - Example reducer

import { Dispatch, useReducer } from "react";
import { BlogFormContext } from "./blog_form_context/createBlogFormContext";

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
export type BlogIdeaState = {
  topic: string;
  title: string;
  details: string;
  keywords: string[];
};

// Structure section
export type BlogStructureItemState = {
  title: string;
  description: string;
  keywords: string[];
};

export type BlogStructureState = {
  length: number;
  sections: BlogStructureItemState[];
};

// Style section
export type BlogStyleState = {
  tone: string;
  purpose: string;
  audience: string;
  formality: number;
  persona: string;
};

// Example section
export type BlogExampleState = {
  examples: string[];
};

// Main form state
export type BlogFormState = {
  idea: BlogIdeaState;
  structure: BlogStructureState;
  style: BlogStyleState;
  example: BlogExampleState;
};

export type BlogFormFieldIndex = {
  field: keyof BlogFormState;
  subfield: string;
};

export type BlogFormAction = {
  type: "UPDATE_FIELD";
  payload: {
    field: keyof BlogFormState;
    subfield: string;
    value: string | string[] | number | BlogStructureItemState[];
  };
};

export type BlogFormContextType = {
  state: BlogFormState;
  dispatch: Dispatch<BlogFormAction>;
  handleUpdateField: (
    field: keyof BlogFormState,
    subfield: string,
    value: string | string[] | number | BlogStructureItemState[]
  ) => void;
};



const blogFormReducer = (state: BlogFormState, action: BlogFormAction) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          [action.payload.subfield]: action.payload.value,
        },
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

  const handleUpdateField = (
    field: keyof BlogFormState,
    subfield: string,
    value: string | string[] | number | BlogStructureItemState[]
  ) => {
    dispatch({ type: "UPDATE_FIELD", payload: { field, subfield, value } });
  };

  return (
    <BlogFormContext.Provider value={{ state, dispatch, handleUpdateField }}>
      {children}
    </BlogFormContext.Provider>
  );
};

