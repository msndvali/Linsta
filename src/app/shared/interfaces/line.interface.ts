export interface ILine {
  id: number;
  matchId: number;
  competitionId: number;
  lineId: number;
  lineTypeIds: number[];
  homeTeamName: string;
  awayTeamName: string;
  lineName: string;
  homeTeamTotalMatches: number;
  homeTeamTotalLinePassed: number;
  homeTeamTotalPercent: number;
  awayTeamTotalMatches: number;
  awayTeamTotalLinePassed: number;
  awayTeamTotalPercent: number;
  homeTeamInMatches: number;
  homeTeamInLinePassed: number;
  homeTeamInPercent: number;
  awayTeamOutMatches: number;
  awayTeamOutLinePassed: number;
  awayTeamOutPercent: number;
  averageSingleSidePercent: number;
  averageTotalPercent: number;
  numberOfLastMatches: string;
}
