import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import HomeLeaderboard from '../helpers/leaderboard/HomeLeaderboard';
import AwayLeaderboard from '../helpers/leaderboard/AwayLeaderboard';
import GeneralLeaderboard from '../helpers/leaderboard/GeneralLeaderboard';
import { ILeaderboard } from '../interfaces';

export default class LeaderboardService {
  static sortRank(rank: ILeaderboard[]) {
    return rank.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }

  static async getGeneralLeaderboard() {
    const matches = await Matches.findAll({ where: { inProgress: 0 } });
    const teams = await Teams.findAll();

    const rank = teams.map((team) => (
      new GeneralLeaderboard(team.id, team.teamName, matches).teamBoard
    ));
    return this.sortRank(rank);
  }

  static async getHomeLeaderboard() {
    const matches = await Matches.findAll({ where: { inProgress: 0 } });
    const teams = await Teams.findAll();

    const rank = teams.map((team) => (
      new HomeLeaderboard(team.id, team.teamName, matches).teamBoard
    ));
    return this.sortRank(rank);
  }

  static async getAwayLeaderboard() {
    const matches = await Matches.findAll({ where: { inProgress: 0 } });
    const teams = await Teams.findAll();

    const rank = teams.map((team) => (
      new AwayLeaderboard(team.id, team.teamName, matches).teamBoard
    ));
    return this.sortRank(rank);
  }
}
