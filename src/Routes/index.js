// Import your route files here
import Auth from './Auth';

// Add your route imports to "routes" array
const routes = [
  Auth,
];

export default (app) => {
  routes.forEach((route) => route(app));
};
