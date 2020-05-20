import FormattedError from './FormattedError';
import Helpers from '../Helpers';

/**
 * Class to format errors to a standard format
 *
 * @export
 * @class ErrorFormatter
 */
export default class ErrorFormatter {
  /**
   * Middleware for error handling
   *
   * @static
   * @param {any} err - Error
   * @param {Request} _req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - Next function
   * @returns {Response|void} If an error occurred, return a Response detailing the error,
   * if not, return the next function (void)
   * @memberof ErrorFormatter
   */
  static middleware(err, _req, res, next) {
    if (!err) return next();

    const error = this.format(err);
    return res.status(error.code).send(error);
  }

  /**
   * Formats an error
   *
   * @static
   * @param {*} error - The error to be formatted
   * @returns {FormattedError} The formatted error
   * @memberof ErrorFormatter
   */
  static format(error) {
    // Parse error
    const formattedError = this.parse(error);

    // If in development, add stack and error name
    if (process.env.APP_ENV === 'development') {
      if (error.name) formattedError.originalName = error.name;
      if (error.stack) formattedError.stack = error.stack;
    }

    return formattedError;
  }

  /**
   * Parse the error name and create a FormattedError
   *
   * @static
   * @param {*} error - The error to be parsed
   * @returns {FormattedError} The formatted error
   * @memberof ErrorFormatter
   */
  static parse(error) {
    switch (error.name) {
      case 'AccountNotActivatedError':
        return new FormattedError(
          401,
          'AccountNotActivatedError',
          'Account Not Activated',
          'Your account has not been activated yet, check your e-mail.',
        );

      case 'BadRequestError':
        return new FormattedError(
          400,
          'BadRequestError',
          'Bad Request',
          'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
        );

      case 'EmailAlreadyInUseError':
        return new FormattedError(
          400,
          'EmailAlreadyInUseError',
          'Email Already In Use',
          'The provided e-mail is already being used by another account.',
        );

      case 'ForbiddenError':
        return new FormattedError(
          403,
          'ForbiddenError',
          'Forbidden',
          'The provided token does not have access to the requested resource.',
        );

      case 'InvalidCredentialsError':
        return new FormattedError(
          401,
          'InvalidCredentialsError',
          'Invalid Credentials',
          'The provided email and/or password are incorrect',
        );

      case 'JsonWebTokenError':
        return new FormattedError(
          403,
          'TokenError',
          'Forbidden',
          'The provided token is invalid or does not have access to the requested resource.',
        );

      case 'ResourceNotFoundError':
        return new FormattedError(
          404,
          'ResourceNotFoundError',
          'Resource Not Found',
          'The requested resource was not found or does not exist.',
        );

      case 'SequelizeConnectionRefusedError':
        return new FormattedError(
          503,
          'ServiceUnavailableError',
          'Service Unavailable',
          'The service is unavailable due to a database connection error. Try again later.',
        );

      case 'SequelizeForeignKeyConstraintError':
        return new FormattedError(
          400,
          'ForeignKeyConstraintError',
          'Foreign Key Constraint Error',
          'The provided data violates a foreign key constraint.',
        );

      case 'SequelizeValidationError':
        return new FormattedError(
          400,
          'ValidationError',
          'Validation Error',
          Helpers.capitalizeFirstLetter(error.errors[0].message),
          error.errors[0].path,
          error.errors[0].validatorKey,
        );

      case 'SequelizeUniqueConstraintError':
        return new FormattedError(
          400,
          'ValidationError',
          'Validation Error',
          Helpers.capitalizeFirstLetter(error.errors[0].message),
          error.errors[0].path,
          error.errors[0].validatorKey,
        );

      case 'TooManyAttemptsError':
        return new FormattedError(
          403,
          'TooManyAttemptsError',
          'Too Many Attempts',
          'Too many invalid attempts were made. The resource has expired.',
        );

      case 'UnauthorizedError':
        return new FormattedError(
          401,
          'UnauthorizedError',
          'Unauthorized',
          'No authorization token was found.',
        );

      default:
        return new FormattedError(
          500,
          'UnknownError',
          'Unknown Error',
          'An error occurred, but it could not be identified.',
        );
    }
  }
}
