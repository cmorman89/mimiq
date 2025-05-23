# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Pages:

  - Home
  - Generate (Blog, for now)
  - Knowledge (placeholder)
  - Workflow (placeholder)
  - Settings (placeholder)
  - Login (placeholder)

- Landing page:

  - Hero section with animated text
  - Feature announcement banner

- Integrations:

  - LMStudio
  - OpenAI
  - Ollama

- Blog Generation:
  - Custom, animated stepper for workflow
  - Blog topic selection
  - Blog structure definition (placeholder)
  - Blog style configuration (placeholder)
  - Blog examples review (placeholder)
  - Final blog post generation (placeholder)
  - Model selection and output preview

### Technical

- Added type definitions for:
  - LMStudioModel
  - LMStudioModelList
  - ParsedModel
- Implemented string utilities for:
  - Title case conversion
  - String capitalization
  - String truncation with ellipsis
- Added model component mapping for:
  - Claude
  - DeepSeek
  - Gemini
  - Gemma
  - Groq
  - Llama
  - Mistral
  - OpenAI
  - Qwen
  - Phi
- FastAPI routing
