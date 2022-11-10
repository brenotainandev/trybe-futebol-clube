import { Request, Response, NextFunction } from 'express';
import StatusCode from '../types/status.code.types';
import ILeaderboard from '../interfaces/ILeaderboard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import LeaderboardService from '../services/leader.board.service';

const leaderboardService = new LeaderboardService(MatchModel, TeamModel);

export default {
  getLeaderboardHome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard('home');

      res.status(Number(StatusCode.OK)).json(leaderboards);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: 'Server error' }));
    }
  },

  getLeaderboardAway: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard('away');

      res.status(Number(StatusCode.OK)).json(leaderboards);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: 'Server errorr' }));
    }
  },

  getLeaderboardGeneral: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard();

      res.status(Number(StatusCode.OK)).json(leaderboards);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: 'Server error' }));
    }
  },
};
