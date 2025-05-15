# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Blog generation workflow with multi-step process:

  - Blog topic selection
  - Blog structure definition
  - Blog style configuration
  - Blog examples review
  - Final blog post generation
  - Model selection and output preview
  - Split-pane layout for content and preview

- Mad Libs generator utility:

  - Interactive story generation
  - Dynamic placeholder parsing
  - Real-time input handling
  - Story reveal functionality
  - Story reset capability
  - Formatted story display with styled placeholders

- LMStudio integration:

  - Model management and selection
  - Automatic model data fetching
  - Manual model refresh capability
  - Model metadata display
  - Model family icons and branding
  - Connection configuration:
    - Protocol selection (HTTP/HTTPS)
    - Server address configuration
    - API endpoint customization
    - Endpoint prefix management
    - Models endpoint configuration
    - Completions endpoint setup
    - Embeddings endpoint setup

- Knowledge management system:

  - Nested route structure
  - Knowledge base management
  - Example content management
  - Consistent layout container

- Landing page features:

  - Hero section with animated text
  - Feature announcement banner
  - Gradient text effects
  - Call-to-action buttons
  - Animated cursor effect
  - Quick access to core features

- Model display features:
  - Model name and version display
  - Interactive hover state
  - Portal-based hover card
  - Position-aware hover card placement
  - Model ID parsing and formatting
  - Parent hover state synchronization
  - Color-coded model family indicators
  - Monochrome and color icon variants

### Changed

- Improved model ID parsing:
  - Enhanced version number detection
  - Better parameter count handling
  - Improved subversion parsing
  - More accurate model family detection
  - Support for embedded versions
  - Fallback to default components

### Fixed

- Model list error handling:
  - Graceful fallback on fetch errors
  - Empty state management
  - Error logging
  - State reset on failure

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
