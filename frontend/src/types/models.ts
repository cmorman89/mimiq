/**
 * Type definitions for LM Studio model data structures.
 */

/**
 * Represents a single LM Studio model with its metadata.
 *
 * @typedef {Object} LMStudioModel
 * @property {string} id - The unique identifier of the model
 * @property {string} object - The type of object (typically "model")
 * @property {string} owned_by - The organization or entity that owns the model
 */
export type LMStudioModel = {
  id: string;
  object: string;
  owned_by: string;
};

/**
 * Represents a list of LM Studio models with pagination metadata.
 *
 * @typedef {Object} LMStudioModelList
 * @property {LMStudioModel[]} data - Array of model objects
 * @property {string} object - The type of object (typically "list")
 */
export type LMStudioModelList = {
  data: LMStudioModel[];
  object: string;
};
