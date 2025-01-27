export interface ICompetition {
  name: string;
  matches: IMatch[];
}

export interface IMatch {
  id: number;
  homeTeamName: string;
  awayTeamName: string;
  date: Date;
  homeTeamScore: string;
  awayTeamScore: string;
}
