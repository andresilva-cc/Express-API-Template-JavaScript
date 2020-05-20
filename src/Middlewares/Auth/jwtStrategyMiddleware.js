import Passport from 'passport';

/**
 * Passport JWT Strategy Middleware
 *
 * @export
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function
 * @returns {Response} Response
 */
export default function jwtStrategyMiddleware(req, res, next) {
  Passport.authenticate('jwt', { session: false })(req, res, next);
}
