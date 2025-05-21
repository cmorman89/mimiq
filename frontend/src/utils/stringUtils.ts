/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export const capitalize = (str: string) => {
  // If the string is empty, return it
  if (!str) return str;
  // Capitalize the first letter of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The title cased string
 */
export const toTitleCase = (str: string) => {
  // If the string is empty, return it
  if (!str) return str;
  if (str === "gpt") return "GPT";
  return (
    str
      // Standardize to lowercase
      .toLowerCase()
      // Split into words
      .split(" ")
      // Capitalize words that are longer than 2 characters
      .map((word) => (word.length > 2 ? capitalize(word) : word))
      // Join words back together
      .join(" ")
  );
};

/**
 * Truncates a string to a maximum length with an optional ellipsis
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string
 * @param ellipsis - Whether to include an ellipsis at the end of the truncated string
 * @returns The truncated string
 */
export const truncate = (str: string, maxLength: number, ellipsis = true) => {
  // If the string is empty, return it
  if (!str) return str;
  // Return truncated string with ellipsis if it's longer than the max length
  return str.length > maxLength
    ? str.slice(0, maxLength) + (ellipsis ? "..." : "")
    : str;
};
