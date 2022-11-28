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
