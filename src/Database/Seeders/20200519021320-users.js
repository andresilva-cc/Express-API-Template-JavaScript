module.exports = {
  /**
   * Run the seeder
   *
   * @param {QueryInterface} queryInterface
   */
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      name: 'Keir Paylie',
      email: 'kpaylie0@yelp.com',
      password: '$2b$12$11Vdm0jaL/nUmE6WzuRv8eL7xoAhCcDnFbXP4.uUu0wjDZgjWnGr2',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Corinna Ixer',
      email: 'cixer1@paginegialle.it',
      password: '$2b$12$aLJuLZ/I2l.5sMlCFK0vROuVTWigCYKRYdJP966fxVNV5AQUt0x7W',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  /**
   * Undo the seeder
   *
   * @param {QueryInterface} queryInterface
   */
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
