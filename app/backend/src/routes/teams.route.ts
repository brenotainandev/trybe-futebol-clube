import { Router } from 'express';
import teamController from '../controllers/team.controller';

const teamsRoute: Router = Router();

teamsRoute.get('/', teamController.getTeams);
teamsRoute.get('/:id', teamController.getTeamById);

export default teamsRoute;
