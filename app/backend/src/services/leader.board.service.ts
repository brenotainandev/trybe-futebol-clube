import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import StatusCode from '../types/status.code.types';
import ITeam from '../interfaces/ITeam';
import ILeaderboardService, { gameLocation } from '../interfaces/ILeaderboardService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import HttpError from '../shared/HttpError';

class Leaderboard implements ILeaderboardService {
  public teamBoard: ILeaderboard;
  public location?: gameLocation;

  constructor(private matchModel: typeof MatchModel, private teamModel: typeof TeamModel) {
    this.zero();
  }

  public async getLeaderboard(location?: gameLocation)
    : Promise<ILeaderboard[]> {
    this.location = location;
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const newScore = this.ScoreCreate(teams, matches);

    return Leaderboard.Ordain(newScore);
  }

  private ScoreCreate(teams: ITeam[], matches: IMatch[])
    : ILeaderboard[] {
    const leaderboard: ILeaderboard[] = teams.map((team) => {
      if (!team.id) throw new HttpError(Number(StatusCode.SERVER_ERROR), 'Unknown error');

      const teamMatches = this.matchesFilter(team.id, matches);
      this.teamStatsCreate(team, teamMatches);

      return this.teamBoard;
    });

    return leaderboard;
  }

  private teamStatsCreate(team: ITeam, matches: IMatch[]): void {
    this.zero(team.teamName);

    matches.forEach((match) => {
      if (match.homeTeam === team.id) return this.homeCalculate(match);
      this.awayCalculate(match);
    });
  }

  private homeCalculate(match: IMatch): void {
    this.points(match.homeTeamGoals, match.awayTeamGoals);
    this.teamBoard.totalGames += 1;
    this.teamBoard.goalsFavor += match.homeTeamGoals;
    this.teamBoard.goalsOwn += match.awayTeamGoals;
    this.teamBoard.goalsBalance = this.teamBoard.goalsFavor - this.teamBoard.goalsOwn;
    this.calculate();
  }

  private awayCalculate(match: IMatch): void {
    this.points(match.awayTeamGoals, match.homeTeamGoals);
    this.teamBoard.totalGames += 1;
    this.teamBoard.goalsFavor += match.awayTeamGoals;
    this.teamBoard.goalsOwn += match.homeTeamGoals;
    this.teamBoard.goalsBalance = this.teamBoard.goalsFavor - this.teamBoard.goalsOwn;
    this.calculate();
  }

  private points(currentTeamGoals: number, opposingTeamGoals: number): void {
    if (currentTeamGoals > opposingTeamGoals) {
      this.teamBoard.totalPoints += 3;
      this.teamBoard.totalVictories += 1;
      return;
    }
    if (currentTeamGoals === opposingTeamGoals) {
      this.teamBoard.totalPoints += 1;
      this.teamBoard.totalDraws += 1;
      return;
    }
    this.teamBoard.totalLosses += 1;
  }

  private matchesFilter(teamId: number, matches: IMatch[]) {
    if (this.location === 'home') { return matches.filter((match) => match.homeTeam === teamId); }
    if (this.location === 'away') { return matches.filter((match) => match.awayTeam === teamId); }
    return matches.filter((match) => match.homeTeam === teamId
      || match.awayTeam === teamId);
  }

  private calculate() {
    const efficiency = (
      (this.teamBoard.totalPoints / (this.teamBoard.totalGames * 3)) * 100)
      .toFixed(2);

    this.teamBoard.efficiency = Number(efficiency);
  }

  private static Ordain(leaderboard: ILeaderboard[]): ILeaderboard[] {
    const resul = (a: ILeaderboard, b: ILeaderboard): number => {
      const equalVictories = a.totalVictories === b.totalVictories;
      const equalGoalsBalance = a.goalsBalance === b.goalsBalance;
      const equalGoalsFavor = a.goalsFavor === b.goalsFavor;

      if (!equalVictories) return a.totalVictories > b.totalVictories ? -1 : 1;
      if (!equalGoalsBalance) return a.goalsBalance > b.goalsBalance ? -1 : 1;
      if (!equalGoalsFavor) return a.goalsFavor > b.goalsFavor ? -1 : 1;

      return a.goalsOwn > b.goalsOwn ? -1 : 1;
    };

    const ordainedBoard = leaderboard.sort((a, b) => {
      const equalPoints = a.totalPoints === b.totalPoints;

      if (!equalPoints) return a.totalPoints > b.totalPoints ? -1 : 1;

      return resul(a, b);
    });

    return ordainedBoard;
  }

  private zero(name?: string): void {
    this.teamBoard = {
      name: name || '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }
}

export default Leaderboard;
