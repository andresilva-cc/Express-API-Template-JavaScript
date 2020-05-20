/**
 * The default Error class accepts a "message" in the constructor,
 * but we need a constructor with "name" so we can use it in the ErrorFormatter
 *
 * @export
 * @class CustomError
 */
export default class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   * @param {string} name Name of the error
   * @memberof CustomError
   */
  constructor(name) {
    super();
    this.name = name;
  }
}
