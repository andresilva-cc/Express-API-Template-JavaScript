import BaseRepository from './BaseRepository';
import { User } from '../Models';

/**
 * User Repository
 *
 * @export
 * @class UserRepository
 * @extends {BaseRepository}
 */
export default class UserRepository extends BaseRepository {
  /**
   * Creates an instance of the repository.
   * @memberof UserRepository
   */
  constructor() {
    super();
    this.model = User;
  }

  /**
   * Retrieve a user by its e-mail
   *
   * @param {string} email E-mail
   * @returns {Object|null} The user if found, null if not
   * @memberof UserRepository
   */
  async findByEmail(email) {
    return this.model.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * Checks if the e-mail is already in use
   *
   * @param {string} email The username to check
   * @returns {boolean}
   * @memberof UserRepository
   */
  async emailExists(email) {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    return user !== null;
  }
}
