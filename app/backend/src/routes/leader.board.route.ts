import { Router } from 'express';
import leaderboardController from '../controllers/leader.board.controller';

const leaderboardRoute: Router = Router();

leaderboardRoute.get('/', leaderboardController.getLeaderboardGeneral);

leaderboardRoute.get('/home', leaderboardController.getLeaderboardHome);

leaderboardRoute.get('/away', leaderboardController.getLeaderboardAway);

export default leaderboardRoute;
