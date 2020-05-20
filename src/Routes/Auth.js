import AuthController from '../App/Controllers/AuthController';
import localStrategyMiddleware from '../Middlewares/Auth/localStrategyMiddleware';
import jwtStrategyMiddleware from '../Middlewares/Auth/jwtStrategyMiddleware';

export default (app) => {
  app.post('/auth/login', localStrategyMiddleware);
  app.post('/auth/register', AuthController.register);
  app.get('/auth/activate/:token', AuthController.activate);
  app.get('/auth/test', jwtStrategyMiddleware, AuthController.test);
};
