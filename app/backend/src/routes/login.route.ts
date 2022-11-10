import { Router } from 'express';
import validate from '../middlewares/validation';
import loginController from '../controllers/login.controller';

const loginRoute: Router = Router();

loginRoute.post('/', validate.login, loginController.login);
loginRoute.get('/validate', loginController.loginValidate);

export default loginRoute;
