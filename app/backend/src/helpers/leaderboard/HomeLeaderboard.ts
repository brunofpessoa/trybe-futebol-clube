import Leaderboard from './Leaderboard';

export default class HomeLeaderboard extends Leaderboard {
  setPlayedMatches() {
    this._playedMatches = this.allMatches.filter(({ homeTeam }) => (
      homeTeam === this.teamID
    ));
  }

  setWonMatches() {
    this._wonMatches = this._playedMatches.filter((match) => (
      match.homeTeam === this.teamID && match.homeTeamGoals > match.awayTeamGoals
    )).length;
  }

  setDrawMatches() {
    this._drawMatches = this._playedMatches.filter((match) => (
      match.homeTeam === this.teamID && match.homeTeamGoals === match.awayTeamGoals
    )).length;
  }

  setLoosedMatches() {
    this._loosedMatches = this._playedMatches.filter((match) => (
      match.homeTeam === this.teamID && match.homeTeamGoals < match.awayTeamGoals
    )).length;
  }

  setGoalsFavor() {
    this._goalsFavor = this._playedMatches.reduce((totalGoals, match) => (
      match.homeTeam === this.teamID ? totalGoals + match.homeTeamGoals : 0), 0);
  }

  setGoalsOwn() {
    this._goalsOwn = this._playedMatches.reduce((totalGoals, match) => (
      match.homeTeam === this.teamID ? totalGoals + match.awayTeamGoals : 0), 0);
  }

  get teamBoard() {
    return this._teamBoard;
  }
}
