import { Model } from 'sequelize';

/**
 * User Model
 *
 * @export
 * @class User
 * @extends {Model}
 */
export default class User extends Model {
  /**
   * Initialize model
   *
   * @static
   * @param {Sequelize} sequelize Sequelize instance
   * @param {DataTypes} dataTypes Sequelize data types
   * @returns {void}
   * @memberof User
   */
  static init(sequelize, dataTypes) {
    return super.init({
      name: {
        allowNull: false,
        type: dataTypes.STRING(50),
      },
      email: {
        allowNull: false,
        type: dataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      active: {
        allowNull: false,
        defaultValue: false,
        type: dataTypes.BOOLEAN,
      },
    }, { sequelize });
  }

  /**
   * Associate model
   *
   * @static
   * @param {Model[]} models
   * @memberof User
   */
  static associate(models) {
    this.hasOne(models.UserActivation, {
      as: 'activation',
      foreignKey: 'userId',
    });
  }
}
