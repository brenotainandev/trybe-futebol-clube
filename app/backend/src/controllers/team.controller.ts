import { Request, Response, NextFunction } from 'express';
import StatusCode from '../types/status.code.types';
import Teams from '../database/models/TeamModel';
import TeamService from '../services/team.service';

const teamService = new TeamService(Teams);

export default {
  getTeams: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await teamService.getTeams();

      res.status(Number(StatusCode.OK)).json(teams);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: 'Server error' }));
    }
  },

  getTeamById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await teamService.getTeamById(Number(id));

      res.status(Number(StatusCode.OK)).json(team);
    } catch (erro) {
      next(res.status(Number(StatusCode.UNAUTHORIZED))
        .json({ message: 'Server There is no team with such id!' }));
    }
  },

};
