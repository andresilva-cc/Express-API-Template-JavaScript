import AuthService from '../Services/AuthService';

/**
 * Auth Controller
 *
 * @export
 * @class AuthController
 */
export default class AuthController {
  /**
   * Register a new user
   *
   * @static
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {NextFunction} next Next function
   * @returns {Response} Response
   * @memberof AuthController
   */
  static async register(req, res, next) {
    try {
      await AuthService.register(req.body.name, req.body.email, req.body.password);
      return res.sendStatus(200);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   * Activate an user
   *
   * @static
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {NextFunction} next Next function
   * @returns {Response} Response
   * @memberof AuthController
   */
  static async activate(req, res, next) {
    try {
      const result = await AuthService.activate(req.params.token);

      if (result) return res.status(200).send('Account activated, you can login now.');

      return res.status(401).send('Invalid activation token.');
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   * Test authentication
   *
   * @static
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {NextFunction} next Next function
   * @returns {Response} Response
   * @memberof AuthController
   */
  static async test(_req, res) {
    return res.sendStatus(200);
  }
}
