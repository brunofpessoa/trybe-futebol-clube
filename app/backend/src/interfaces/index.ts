export interface ILogin {
  email: string,
  password: string,
}

export interface IToken {
  token?: string,
}

export interface IMatch {
  homeTeam: number
  awayTeam: number
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
