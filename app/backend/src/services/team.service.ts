import Teams from '../database/models/TeamModel';

class TeamService {
  constructor(private teamModel: typeof Teams) {}

  public async getTeams(): Promise<Teams[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getTeamById(id:number): Promise<Teams | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
