import Leaderboard from './Leaderboard';

export default class AwayLeaderboard extends Leaderboard {
  setPlayedMatches() {
    this._playedMatches = this.allMatches.filter(({ awayTeam }) => (
      awayTeam === this.teamID
    ));
  }

  setWonMatches() {
    this._wonMatches = this._playedMatches.filter((match) => (
      match.awayTeam === this.teamID && match.awayTeamGoals > match.homeTeamGoals
    )).length;
  }

  setDrawMatches() {
    this._drawMatches = this._playedMatches.filter((match) => (
      match.awayTeam === this.teamID && match.awayTeamGoals === match.homeTeamGoals
    )).length;
  }

  setLoosedMatches() {
    this._loosedMatches = this._playedMatches.filter((match) => (
      match.awayTeam === this.teamID && match.awayTeamGoals < match.homeTeamGoals
    )).length;
  }

  setGoalsFavor() {
    this._goalsFavor = this._playedMatches.reduce((totalGoals, match) => (
      match.awayTeam === this.teamID ? totalGoals + match.awayTeamGoals : 0), 0);
  }

  setGoalsOwn() {
    this._goalsOwn = this._playedMatches.reduce((totalGoals, match) => (
      match.awayTeam === this.teamID ? totalGoals + match.homeTeamGoals : 0), 0);
  }

  get teamBoard() {
    return this._teamBoard;
  }
}
