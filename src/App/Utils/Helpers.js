/**
 * Helper functions
 *
 * @export
 * @class Helpers
 */
export default class Helpers {
  /**
   * Capitalizes the first letter of a stirng
   *
   * @static
   * @param {string} string - The string to capitalize
   * @returns {string} The capitalized string
   * @memberof Helpers
   */
  static capitalizeFirstLetter(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }
}
