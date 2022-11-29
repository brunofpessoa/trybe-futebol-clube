import { ILeaderboard } from '../../interfaces';
import Matches from '../../database/models/Matches';

export default abstract class Leaderboard {
  protected _playedMatches: Matches[] = [];
  protected _totalGames = 0;
  protected _wonMatches = 0;
  protected _drawMatches = 0;
  protected _loosedMatches = 0;
  protected _goalsFavor = 0;
  protected _goalsOwn = 0;
  protected _goalsBalance = 0;
  protected _totalPoints = 0;
  protected _efficiency = 0;
  protected _teamBoard;

  constructor(
    protected teamID: number,
    protected name: string,
    protected allMatches: Matches[],
  ) {
    this.init();
    this._teamBoard = {
      name: this.name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._wonMatches,
      totalDraws: this._drawMatches,
      totalLosses: this._loosedMatches,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency.toFixed(2),
    };
  }

  protected abstract setPlayedMatches(): void;
  protected abstract setWonMatches(): void;
  protected abstract setDrawMatches(): void;
  protected abstract setLoosedMatches(): void;
  protected abstract setGoalsFavor(): void;
  protected abstract setGoalsOwn(): void;

  private init() {
    this.setPlayedMatches();
    this.setWonMatches();
    this.setDrawMatches();
    this.setLoosedMatches();
    this.setGoalsFavor();
    this.setGoalsOwn();
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._totalPoints = this._wonMatches * 3 + this._drawMatches;
    this._totalGames = this._playedMatches.length;
    this._efficiency = (this._totalPoints * 100) / (this._totalGames * 3);
  }

  get teamBoard(): ILeaderboard {
    return this._teamBoard;
  }
}
