import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { User as UserRepository } from '../App/Repositories';
import ErrorFormatter from '../App/Utils/Error/ErrorFormatter';
import CustomError from '../App/Utils/Error/CustomError';

export default new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
}, async (payload, done) => {
  try {
    // Find user by ID
    const user = await UserRepository.findById(payload.id);

    // If user not found, throw JsonWebTokenError
    if (!user) throw new CustomError('JsonWebTokenError');

    // If user was found, return user data
    return done(null, {
      id: user.id,
      email: user.email,
    });
  } catch (ex) {
    return done(ErrorFormatter.format(ex));
  }
});
