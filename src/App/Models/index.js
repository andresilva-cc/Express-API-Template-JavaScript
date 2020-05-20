/* eslint-disable import/prefer-default-export */

import Sequelize from 'sequelize';
import config from '../../Config/sequelize';

// Import your models here
import UserModel from './User';
import UserActivationModel from './UserActivation';

// Determine app environment
const env = process.env.APP_ENV || 'development';

// Create a new instance of Sequelize
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env],
);

// Add your models imports to "models" object following the pattern
const models = {
  User: UserModel.init(sequelize, Sequelize),
  UserActivation: UserActivationModel.init(sequelize, Sequelize),
};

// Run associations if it exists
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));


// Export your models here
export const { User } = models;
export const { UserActivation } = models;
