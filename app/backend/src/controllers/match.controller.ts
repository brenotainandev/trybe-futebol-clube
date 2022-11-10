import { Request, Response, NextFunction } from 'express';
import StatusCode from '../types/status.code.types';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import MatchService from '../services/match.service';

const matchService = new MatchService(MatchModel);
const mensageServerError = 'Server error';

export default {
  getMatches: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      const state = inProgress === 'true';

      if (inProgress) {
        const matches: IMatch[] = await matchService.getMatchesByProgress(state);
        return res.status(Number(StatusCode.OK)).json(matches);
      }

      const matches: IMatch[] = await matchService.getMatches();

      res.status(Number(StatusCode.OK)).json(matches);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: mensageServerError }));
    }
  },

  createMatch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatchData = req.body;
      const { homeTeam, awayTeam } = newMatchData;

      if (homeTeam === awayTeam) {
        return res.status(Number(StatusCode.NOT_CREATE))
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const match: IMatch | boolean = await matchService.createMatch(req.body);

      if (match === false) {
        return res.status(Number(StatusCode.NOT_FOUND))
          .json({ message: 'There is no team with such id!' });
      }

      return res.status(Number(StatusCode.CREATE)).json(match);
    } catch (erro) {
      next(res.status(Number(StatusCode.UNAUTHORIZED))
        .json({ message: mensageServerError }));
    }
  },

  finishMatch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const message: { message: string } = await matchService.finishMatch(Number(id));

      res.status(Number(StatusCode.OK)).json(message);
    } catch (erro) {
      next(res.status(Number(StatusCode.SERVER_ERROR))
        .json({ message: mensageServerError }));
    }
  },

  updateGoals: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const message: {
        message: string
      } = await matchService.updateGoals(Number(id), req.body);

      res.status(Number(StatusCode.OK)).json(message);
    } catch (erro) {
      next(res.status(Number(StatusCode.BAD_REQUEST))
        .json({ message: 'Match do not exists' }));
    }
  },

};
