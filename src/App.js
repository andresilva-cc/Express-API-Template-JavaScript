import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import Passport from 'passport';
import Routes from './Routes';
import ErrorFormatter from './App/Utils/Error/ErrorFormatter';
import Logger from './App/Utils/Logger';

/**
 * Main Express app class
 *
 * @export
 * @class App
 */
export default class App {
  /**
   * Create an instance of App.
   * @param {{port: number, enableHTTPS: boolean, ssl: { key: string, cert: string }}} options
   * @param {any[]} middlewares
   * @memberof App
   */
  constructor(options, middlewares, authStrategies) {
    // Create an Express instance
    this.app = express();

    // Set instance properties
    this.port = options.port;
    this.enableHTTPS = options.enableHTTPS;
    this.ssl = {
      key: options.ssl.key,
      cert: options.ssl.cert,
    };

    // Load middlewares into the app instance
    this.loadMiddlewares(middlewares);

    // Load auth strategies into the app instance
    App.loadAuthStrategies(authStrategies);

    // Load routes into the app instance
    this.loadRoutes();

    // Load error formatter middleware
    this.app.use(ErrorFormatter.middleware.bind(ErrorFormatter));
  }

  /**
   * Load middlewares
   *
   * @private
   * @param {any[]} middlewares
   * @memberof App
   */
  loadMiddlewares(middlewares) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  /**
   * Load auth strategies
   *
   * @private
   * @param {any[]} strategies
   * @memberof App
   */
  static loadAuthStrategies(strategies) {
    strategies.forEach((strategy) => {
      Passport.use(strategy);
    });
  }

  /**
   * Load routes from the routes directory
   *
   * @private
   * @memberof App
   */
  loadRoutes() {
    Routes(this.app);
  }

  /**
   * Start listening
   *
   * @memberof App
   */
  listen() {
    // If HTTPS is enabled, start a HTTPS server
    if (this.enableHTTPS) {
      const options = {
        key: fs.readFileSync(this.ssl.key),
        cert: fs.readFileSync(this.ssl.cert),
      };

      https.createServer(options, this.app).listen(this.port, () => {
        Logger.success(`HTTPS: Listening on port ${this.port}`);
      });
    // Else, start a HTTP server
    } else {
      http.createServer(this.app).listen(this.port, () => {
        Logger.success(`HTTP: Listening on port ${this.port}`);
      });
    }
  }
}
