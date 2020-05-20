import jwt from 'jsonwebtoken';

/**
 * JWT Facade
 *
 * @class JWTFacade
 */
export default class JWTFacade {
  /**
   * Sign a new JWT
   *
   * @static
   * @param {*} payload
   * @param {Object} options
   * @memberof JWTFacade
   */
  static async sign(payload, options) {
    return jwt.sign(payload, process.env.AUTH_SECRET, options);
  }

  /**
   * Verify a JWT
   *
   * @static
   * @param {string} token Token to verify
   * @param {string} audience Audience to check against
   * @memberof JWTFacade
   */
  static verify(token, audience) {
    return jwt.verify(token, process.env.AUTH_SECRET, { audience });
  }
}
