import { useCallback, useEffect, useState } from "react";
import { LMStudioModelList } from "../types/models";

const API_BASE_URL = "http://127.0.0.1:8001";
const API_PREFIX = "/api";
const API_VERSION = "/v1";
const API_MODELS_ENDPOINT = "/models";
const API_MODELS_URL = `${API_BASE_URL}${API_PREFIX}${API_VERSION}${API_MODELS_ENDPOINT}`;

/**
 * A custom hook for managing LM Studio models data and fetching operations.
 *
 * Features:
 * - Automatic model data fetching on mount
 * - Manual refresh capability
 * - Error handling with fallback state
 * - Type-safe model data management
 * - Centralized API endpoint configuration
 *
 * This hook provides a standardized way to interact with the LM Studio models API,
 * handling data fetching, state management, and error cases.
 *
 * @hook
 * @returns {Object} An object containing:
 *   - lmStudioModels: The current state of the models data
 *   - fetchModels: A function to manually refresh the models data
 *
 * @example
 * const { lmStudioModels, fetchModels } = useModels();
 * // Access models data
 * console.log(lmStudioModels.data);
 * // Refresh models data
 * await fetchModels();
 */
export const useModels = () => {
  const [lmStudioModels, setLMStudioModels] = useState<LMStudioModelList>({
    data: [],
    object: "list",
  });

  const fetchModels = useCallback(async () => {
    try {
      const response = await fetch(API_MODELS_URL);
      const data: LMStudioModelList = await response.json();
      setLMStudioModels(data);
    } catch (error) {
      console.error("Failed to fetch models:", error);
      // Set empty state on error
      setLMStudioModels({ data: [], object: "list" });
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return { lmStudioModels, fetchModels };
};
