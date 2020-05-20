import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import { User as UserRepository, UserActivation as UserActivationRepository } from '../Repositories';
import MailService from './MailService';
import UserRegistered from '../Mail/UserRegistered';
import UserActivated from '../Mail/UserActivated';
import CustomError from '../Utils/Error/CustomError';

/**
 * Auth Service
 *
 * @export
 * @class AuthService
 */
export default class AuthService {
  /**
   * Register a new user
   *
   * @static
   * @param {string} name User name
   * @param {string} email User e-mail
   * @param {string} password User password
   * @memberof AuthService
   */
  static async register(name, email, password) {
    // Check if e-mail is already in use
    if (await UserRepository.emailExists(email)) throw new CustomError('EmailAlreadyInUseError');

    // Create user
    const user = await UserRepository.create({
      name,
      email,
      password: bcrypt.hashSync(password, 12),
    });

    let token;
    let activationExists;

    do {
      // Generate activation token
      token = cryptoRandomString({ length: 32 });

      // Check if token is already in database
      // eslint-disable-next-line no-await-in-loop
      activationExists = await UserActivationRepository.findByToken(token);
    } while (activationExists);

    // Create user activation
    await UserActivationRepository.create({
      userId: user.id,
      token,
    });

    // Send mail with UserRegistered template
    MailService.send(new UserRegistered(user.name, user.email, token).build());
  }

  /**
   * Activate an user
   *
   * @static
   * @param {string} token Activation token
   * @returns {boolean} Activation result
   * @memberof AuthService
   */
  static async activate(token) {
    // Check if token exists
    const activation = await UserActivationRepository.findByToken(token);
    if (!activation) return false;

    // Get user
    const user = await UserRepository.findById(activation.userId);

    // Activate user
    await UserRepository.update(user.id, {
      active: true,
    });

    // Delete activation
    await UserActivationRepository.delete(activation.userId);

    // Send mail with UserActivated template
    MailService.send(new UserActivated(user.name, user.email).build());

    return true;
  }
}
