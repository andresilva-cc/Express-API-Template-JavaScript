import CustomError from '../Utils/Error/CustomError';

/**
 * Base repository to be extended by other repositories
 *
 * @export
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * Return all resources
   *
   * @returns {Object[]} Resources
   * @memberof BaseRepository
   */
  async all() {
    return this.model.findAll();
  }

  /**
   * Retrieve a resource by its ID
   *
   * @param {number} id ID of the resource
   * @returns {Object|null} The resource if found, null if not
   * @memberof BaseRepository
   */
  async findById(id) {
    const resource = await this.model.findByPk(id);

    if (resource) return resource;

    throw new CustomError('ResourceNotFoundError');
  }

  /**
   * Create a new resource
   *
   * @param {Object} data Data of the new resource
   * @returns {Object} The newly created resource
   * @memberof BaseRepository
   */
  async create(data) {
    return this.model.create(data);
  }

  /**
   * Update a resource
   *
   * @param {number} id ID of the resource
   * @param {Object} data Data to update
   * @returns {Object} The updated resource
   * @memberof BaseRepository
   */
  async update(id, data) {
    const resource = await this.findById(id);

    if (resource) {
      await resource.update(data);
      return true;
    }

    throw new CustomError('ResourceNotFoundError');
  }

  /**
   * Delete a resource
   *
   * @param {number} id ID of the resource
   * @returns {number} Number of rows deleted
   * @memberof BaseRepository
   */
  async delete(id) {
    const resource = await this.findById(id);

    if (resource) {
      await resource.destroy();
      return true;
    }

    throw new CustomError('ResourceNotFoundError');
  }
}
