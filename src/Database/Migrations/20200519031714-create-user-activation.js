module.exports = {
  /**
   * Run the migration
   *
   * @param {QueryInterface} queryInterface
   * @param {typeof DataTypes} dataTypes
   */
  up: (queryInterface, dataTypes) => queryInterface.createTable('UserActivations', {
    userId: {
      allowNull: false,
      type: dataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    token: {
      allowNull: false,
      type: dataTypes.STRING(32),
      unique: true,
    },
  }),

  /**
   * Undo the migration
   *
   * @param {QueryInterface} queryInterface
   */
  down: (queryInterface) => queryInterface.dropTable('UserActivations'),
};
