import ITeamGoals from './ITeamGoals';

interface IMatch extends ITeamGoals {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}

export default IMatch;
