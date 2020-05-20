import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User as UserRepository } from '../App/Repositories';
import ErrorFormatter from '../App/Utils/Error/ErrorFormatter';
import CustomError from '../App/Utils/Error/CustomError';

export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    // Find user by e-mail
    const user = await UserRepository.findByEmail(email);

    // If user not found, throw InvalidCredentialsError
    if (!user) throw new CustomError('InvalidCredentialsError');

    // If user has not activated his account yet, throw AccountNotActivatedError
    if (!user.active) throw new CustomError('AccountNotActivatedError');

    // Compare password
    const result = await bcrypt.compare(password, user.password);

    // If wrong password, throw InvalidCredentalsError
    if (!result) throw new CustomError('InvalidCredentialsError');

    // If correct password, return user data
    return done(null, {
      id: user.id,
      email: user.email,
    });
  } catch (ex) {
    return done(ErrorFormatter.format(ex));
  }
});
