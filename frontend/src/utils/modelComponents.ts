import {
  Claude,
  DeepSeek,
  Gemini,
  Gemma,
  Groq,
  Meta,
  Mistral,
  OpenAI,
  Qwen,
  Microsoft,
} from "@lobehub/icons";

import { ComponentType } from "react";

/**
 * A mapping of model families to their associated icon components.
 *
 * This utility provides a centralized mapping of model families to their
 * corresponding icon components, including monochrome and color variants,
 * as well as text representations.
 *
 * Each model family maps to a tuple of three components:
 * 1. MonoIcon: The monochrome version of the model's icon
 * 2. ColorIcon: The colored version of the model's icon
 * 3. Text: The text representation component
 *
 * @constant
 * @type {Record<string, [ComponentType, ComponentType, ComponentType]>}
 *
 * @example
 * // Accessing components for a specific model
 * const [MonoIcon, ColorIcon, Text] = modelComponents['claude'];
 * // Use the components in your JSX
 * <ColorIcon /> // Renders the colored Claude icon
 */
export const modelComponents: Record<
  string,
  [ComponentType, ComponentType, ComponentType]
> = {
  default: [OpenAI, OpenAI, OpenAI.Text],
  claude: [Claude, Claude.Color, Claude.Text],
  deepseek: [DeepSeek, DeepSeek.Color, DeepSeek.Text],
  groq: [Groq, Groq, Groq.Text],
  gemini: [Gemini, Gemini.Color, Gemini.Text],
  gemma: [Gemma, Gemma.Color, Gemma.Text],
  llama: [Meta, Meta.Color, Meta.Text],
  mistral: [Mistral, Mistral.Color, Mistral.Text],
  openai: [OpenAI, OpenAI, OpenAI.Text],
  qwen: [Qwen, Qwen.Color, Qwen.Text],
  phi: [Microsoft, Microsoft.Color, Microsoft.Text],
};
