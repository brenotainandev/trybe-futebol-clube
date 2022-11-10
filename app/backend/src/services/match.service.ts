import MatchesModel from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import ITeamGoals from '../interfaces/ITeamGoals';
import Teams from '../database/models/TeamModel';

class MatchesService {
  constructor(private matchModel: typeof MatchesModel) {}

  public async getMatches(): Promise<IMatch[] | []> {
    const matches: IMatch[] | [] = await this.matchModel.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return matches;
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<IMatch[]> {
    const match: IMatch[] | [] = await this.matchModel.findAll({
      where: { inProgress },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return match;
  }

  public async createMatch(newMatch: IMatch): Promise<IMatch | boolean > {
    const homeTeamValidator = await this.matchModel.findByPk(newMatch.homeTeam);
    const awayTeamValidator = await this.matchModel.findByPk(newMatch.awayTeam);

    if (homeTeamValidator === null || awayTeamValidator === null) {
      return false;
    }

    const match: IMatch = await this.matchModel.create({ ...newMatch, inProgress: true });

    return match;
  }

  public async finishMatch(id: number): Promise<{ message: string }> {
    await this.matchModel.update({
      inProgress: false }, {
      where: {
        id,
      },
    });
    return { message: 'Finished' };
  }

  public async updateGoals(id: number, goals: ITeamGoals): Promise<{ message: string }> {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return { message: 'Goals updated' };
  }
}

export default MatchesService;
