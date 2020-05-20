/* eslint-disable import/prefer-default-export */

// Import your repositories here
import UserRepository from './UserRepository';
import UserActivationRepository from './UserActivationRepository';

// Initialize and export your repositories here
export const User = new UserRepository();
export const UserActivation = new UserActivationRepository();
