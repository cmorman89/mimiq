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
