
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import Passport from 'passport';
import App from './App';
import AuthStrategies from './Auth';
import Logger from './App/Utils/Logger';

Logger.info('Initializing application...');

// Enable dotenv
dotenv.config();

// Parse environment variables
const enableHTTPS = process.env.APP_USE_HTTPS === 'true';
const port = parseInt(enableHTTPS ? process.env.APP_HTTPS_PORT || '443' : process.env.APP_HTTP_PORT || '80', 10);

new App(
  // Options
  {
    port,
    enableHTTPS,
    ssl: {
      key: process.env.APP_SSL_KEY || '',
      cert: process.env.APP_SSL_CERT || '',
    },
  },

  // Middlewares
  [
    morgan('dev'),
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    Passport.initialize(),
  ],

  // Auth strategies
  Object.values(AuthStrategies),
).listen();
