module.exports = {
  /**
   * Run the migration
   *
   * @param {QueryInterface} queryInterface
   * @param {typeof DataTypes} dataTypes
   */
  up: (queryInterface, dataTypes) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
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
    createdAt: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: dataTypes.DATE,
    },
  }),

  /**
   * Undo the migration
   *
   * @param {QueryInterface} queryInterface
   */
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
