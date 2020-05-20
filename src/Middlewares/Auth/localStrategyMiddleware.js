import Passport from 'passport';
import JWTFacade from '../../App/Facades/JWTFacade';

/**
 * Passport Local Strategy Middleware
 *
 * @export
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function
 * @returns {Response} Response
 */
export default function localStrategyMiddleware(req, res, next) {
  Passport.authenticate('local', { session: false }, async (err, user) => {
    // If authentication failed, call next handler (in this case, ErrorFormatter middleware)
    if (err) return next(err);

    // Sign a new Json Web Token
    const token = await JWTFacade.sign(user);

    // Return user data and token
    return res.status(200).send({
      user,
      token,
    });
  })(req, res, next);
}
