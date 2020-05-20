/* eslint-disable no-console */

import symbols from 'log-symbols';
import chalk from 'chalk';

/**
 * Helper class to log messages to the console
 *
 * @export
 * @class Logger
 */
export default class Logger {
  /**
   * Logs an info message
   *
   * @static
   * @param {string} message Message to log
   * @param {string[]} [environments=['production', 'development', 'test']]
   * Environments to log the message
   * @memberof Logger
   */
  static info(message, environments = ['production', 'development', 'test']) {
    if (environments.includes(process.env.APP_ENV || 'production')) {
      console.log(symbols.info, chalk.blue(message));
    }
  }

  /**
   * Logs a success message
   *
   * @static
   * @param {string} message Message to log
   * @param {string[]} [environments=['production', 'development', 'test']]
   * Environments to log the message
   * @memberof Logger
   */
  static success(message, environments = ['production', 'development', 'test']) {
    if (environments.includes(process.env.APP_ENV || 'production')) {
      console.log(symbols.success, chalk.green(message));
    }
  }

  /**
   * Logs a warning message
   *
   * @static
   * @param {string} message Message to log
   * @param {string[]} [environments=['production', 'development', 'test']]
   * Environments to log the message
   * @memberof Logger
   */
  static warning(message, environments = ['production', 'development', 'test']) {
    if (environments.includes(process.env.APP_ENV || 'production')) {
      console.log(symbols.warning, chalk.yellow(message));
    }
  }

  /**
   * Logs an error message
   *
   * @static
   * @param {string} message Message to log
   * @param {string[]} [environments=['production', 'development', 'test']]
   * Environments to log the message
   * @memberof Logger
   */
  static error(message, environments = ['production', 'development', 'test']) {
    if (environments.includes(process.env.APP_ENV || 'production')) {
      console.log(symbols.error, chalk.red(message));
    }
  }
}
