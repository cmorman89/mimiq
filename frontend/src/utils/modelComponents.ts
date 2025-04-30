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

// [MonoIcon, ColorIcon, Text]
export const modelComponents: Record<
  string,
  [ComponentType, ComponentType, ComponentType]
> = {
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
