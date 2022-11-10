import { Router } from 'express';
import tokenValidate from '../middlewares/tokenValidate';
import matchController from '../controllers/match.controller';

const matchesRoute: Router = Router();

matchesRoute.get('/', matchController.getMatches);
matchesRoute.post(
  '/',
  tokenValidate,
  matchController.createMatch,
);
matchesRoute.patch('/:id', matchController.updateGoals);
matchesRoute.patch('/:id/finish', tokenValidate, matchController.finishMatch);

export default matchesRoute;
