import ILeaderboard from './ILeaderboard';

export type gameLocation = 'home' | 'away';

interface ILeaderboardService {
  teamBoard: ILeaderboard;
  location?: gameLocation;
  getLeaderboard(location?: gameLocation): Promise<ILeaderboard[]>;
}

export default ILeaderboardService;
