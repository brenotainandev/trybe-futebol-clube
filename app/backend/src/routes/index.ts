import { Router } from 'express';
import loginRoute from './login.route';
import teamsRoute from './teams.route';
import matchesRoute from './matches.route';
import leaderboardRoute from './leader.board.route';

const routes: Router = Router();

routes.use('/matches', matchesRoute);
routes.use('/leaderboard', leaderboardRoute);
routes.use('/login', loginRoute);
routes.use('/teams', teamsRoute);

export default routes;
