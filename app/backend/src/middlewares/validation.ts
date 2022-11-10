import { Request, Response, NextFunction } from 'express';
import StatusCode from '../types/status.code.types';
import Teams from '../database/models/TeamModel';
import TeamService from '../services/team.service';
import IMatch from '../interfaces/IMatch';

const teamService = new TeamService(Teams);

export default {
  login: (req: Request, res: Response, next: NextFunction): void => {
    const { password, email } = req.body;
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validateEmail: boolean = regexEmail.test(email);

    if (!password || !email) {
      res.status(Number(StatusCode.BAD_REQUEST))
        .json({ message: 'All fields must be filled' });
    }

    if (password.length <= 6) {
      res.status(Number(StatusCode.BAD_REQUEST))
        .json({ message: 'Password need to have at least 6 characters' });
    }

    if (!validateEmail) {
      res.status(Number(StatusCode.UNAUTHORIZED))
        .json({ message: 'Incorrect email or password' });
    }

    next();
  },

  newMatchIdNull: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newMatch: IMatch = req.body;

    const homeTeamValidator = await teamService.getTeamById(newMatch.homeTeam);
    const awayTeamValidator = await teamService.getTeamById(newMatch.awayTeam);

    if (homeTeamValidator === null || awayTeamValidator === null) {
      res.status(Number(StatusCode.NOT_FOUND))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  },

  newMatchEqual: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newMatch: IMatch = req.body;

    if (newMatch.homeTeam === newMatch.awayTeam) {
      res.status(Number(StatusCode.NOT_CREATE))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  },
};
