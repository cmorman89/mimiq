/**
 * Interface representing the parsed components of a model identifier.
 * @interface ParsedModel
 * @property {string} model_family - The base name or family of the model
 * @property {string} [version] - The version number of the model (e.g., "1.0")
 * @property {string[]} [subversion] - Additional version identifiers or qualifiers
 * @property {string} [params] - The parameter count of the model (e.g., "7b" for 7 billion parameters)
 * @property {string[]} [suffix] - Any additional suffixes or qualifiers
 */
export interface ParsedModel {
  model_family: string;
  version?: string;
  subversion?: string[];
  params?: string;
  suffix?: string[];
  original_model_id?: string;
}

/**
 * Parses a model identifier string into its constituent parts.
 *
 * This function takes a model identifier string and breaks it down into its components:
 * - Model family (e.g., "llama", "mistral")
 * - Version number (e.g., "2", "1.0")
 * - Parameter count (e.g., "7b", "13b")
 * - Additional qualifiers and suffixes
 *
 * @example
 * // Basic usage
 * parseModelId("llama-2-7b") // Returns { model_family: "llama", version: "2", params: "7b" }
 *
 * // With subversion and suffix
 * parseModelId("mistral-7b-instruct") // Returns { model_family: "mistral", params: "7b", suffix: ["instruct"] }
 *
 * // With embedded version
 * parseModelId("phi2") // Returns { model_family: "phi", version: "2" }
 *
 * @param {string} modelId - The model identifier string to parse
 * @returns {ParsedModel} An object containing the parsed components of the model identifier
 */
export const parseModelId = (modelId: string): ParsedModel => {
  const parts = modelId.toLowerCase().split("-");
  const paramRegex = /^(\d+)(b|m|k)$/i;
  const versionRegex = /^\d+(\.\d+)?$/;
  const vVersionRegex = /^v(\d+(\.\d+)?)$/;

  let model_family = "";
  let version: string | undefined;
  const paramCandidates: string[] = [];
  const subversion: string[] = [];
  const suffix: string[] = [];

  let i = 0;

  // Detect and set model_family
  while (i < parts.length) {
    const part = parts[i];

    if (
      versionRegex.test(part) ||
      vVersionRegex.test(part) ||
      paramRegex.test(part)
    )
      break;
    const embeddedVersionMatch = part.match(/^([a-z]+)(\d+(\.\d+)?)$/);
    if (embeddedVersionMatch) {
      if (!model_family) {
        model_family = embeddedVersionMatch[1];
        version = embeddedVersionMatch[2];
        i++;
        break;
      } else {
        subversion.push(part); // Don't overwrite existing family
        i++;
        continue;
      }
    }

    model_family += (model_family ? "-" : "") + part;
    i++;
  }

  // Continue parsing
  for (; i < parts.length; i++) {
    const part = parts[i];

    if (!version && versionRegex.test(part)) {
      version = part;
    } else if (!version && vVersionRegex.test(part)) {
      version = part.slice(1);
    } else if (paramRegex.test(part)) {
      paramCandidates.push(part);
    } else if (paramCandidates.length > 0) {
      suffix.push(part);
    } else {
      subversion.push(part);
    }
  }

  // Determine the largest param
  const scale = { b: 3, m: 2, k: 1 };
  const params = paramCandidates.sort((a, b) => {
    const [aval, aunit] = a.match(paramRegex)!.slice(1);
    const [bval, bunit] = b.match(paramRegex)!.slice(1);
    const aScore = parseInt(aval) * 10 ** scale[aunit as keyof typeof scale];
    const bScore = parseInt(bval) * 10 ** scale[bunit as keyof typeof scale];
    return bScore - aScore;
  })[0];

  return {
    model_family,
    ...(version && { version }),
    ...(subversion.length > 0 && { subversion }),
    ...(params && { params }),
    ...(suffix.length > 0 && { suffix }),
    ...(modelId && { original_model_id: modelId }),
  };
};
