import BaseRepository from './BaseRepository';
import { UserActivation } from '../Models';
import CustomError from '../Utils/Error/CustomError';

/**
 * User Activation Repository
 *
 * @export
 * @class UserActivationRepository
 * @extends {BaseRepository}
 */
export default class UserActivationRepository extends BaseRepository {
  /**
   * Create an instance of the repository.
   * @memberof UserActivationRepository
   */
  constructor() {
    super();
    this.model = UserActivation;
  }

  /**
   * Retrieve a user activation by its user ID
   *
   * @param {number} userId ID of the user
   * @returns {Object|null} The resource if found, null if not
   * @override
   * @memberof BaseRepository
   */
  async findById(userId) {
    const resource = await this.model.findOne({
      where: {
        userId,
      },
    });

    if (resource) return resource;

    throw new CustomError('ResourceNotFoundError');
  }

  /**
   * Retrieve a user by its e-mail
   *
   * @param {string} email E-mail
   * @returns {Object|null} The user if found, null if not
   * @memberof UserActivationRepository
   */
  async findByToken(token) {
    return this.model.findOne({
      where: {
        token,
      },
    });
  }


  /**
   * Delete a user activation
   *
   * @param {number} userId ID of the user
   * @returns {number} Number of rows deleted
   * @override
   * @memberof BaseRepository
   */
  async delete(userId) {
    const resource = await this.findById(userId);

    if (resource) {
      await resource.destroy();
      return true;
    }

    throw new CustomError('ResourceNotFoundError');
  }
}
