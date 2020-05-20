import { Model } from 'sequelize';

/**
 * User Activation Model
 *
 * @export
 * @class UserActivation
 * @extends {Model}
 */
export default class UserActivation extends Model {
  /**
   * Initialize model
   *
   * @static
   * @param {Sequelize} sequelize Sequelize instance
   * @param {DataTypes} dataTypes Sequelize data types
   * @returns {void}
   * @memberof UserActivation
   */
  static init(sequelize, dataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: dataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      token: {
        allowNull: false,
        type: dataTypes.STRING(32),
        unique: true,
      },
    }, {
      timestamps: false,
      sequelize,
    });
  }

  /**
   * Associate model
   *
   * @static
   * @param {Model[]} models
   * @memberof UserActivation
   */
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}
