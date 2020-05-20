import bcrypt from 'bcrypt';
import Logger from '../Logger';

// Args
const args = process.argv.slice(2);
const [password] = args;

if (!password) {
  Logger.error('Missing argument: password');
  Logger.info('Usage:');
  Logger.info('node generatePassword.js password\t\t\t(if running from dist directory)');
  Logger.info('npx sucrase-node generatePassword.js password\t\t(if running from src directory)');
  process.exit();
}

Logger.info('Generating hash with 12 rounds...');

// Hash the password
bcrypt.hash(password, 12).then((hash) => {
  Logger.success(`Hash: ${hash}`);
});
