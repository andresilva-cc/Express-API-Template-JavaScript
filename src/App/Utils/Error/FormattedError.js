/**
 * A class to standardize the errors returned from the application
 *
 * @export
 * @class FormattedError
 */
export default class FormattedError {
  /**
   * Create an instance of FormattedError
   * @param {number} code HTTP status code
   * @param {string} name Error name
   * @param {string} title Error title
   * @param {string} description Error description
   * @param {string} [field] If it's a validation error, the field that failed to validate
   * @param {string} [validator] If it's a validation error, the validator that failed
   * @memberof FormattedError
   */
  constructor(code, name, title, description, field = null, validator = null) {
    this.code = code;
    this.name = name;
    this.title = title;
    this.description = description;
    if (field) this.field = field;
    if (validator) this.validator = validator;
  }

  getError() {
    // Create the object with the default properties
    const object = {
      code: this.code,
      name: this.name,
      title: this.title,
      description: this.description,
    };

    // If it's a validation error, add the validation properties too
    if (this.field) {
      object.field = this.field;
      object.validator = this.validator;
    }

    // If it's a development environment, add the custom properties too
    if (this.originalName) {
      object.originalName = this.originalName;
      object.validator = this.validator;
    }

    return object;
  }
}
