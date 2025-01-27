import { Component, OnInit } from '@angular/core';
import { ICompetition, IMatch } from '../../shared/interfaces/competition.interface';
import { CompetitionsService } from '../../services/competitions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LinesService } from '../../services/lines.service';
import { FormControl } from '@angular/forms';
import { numberOfLastMatchesFilter } from '../../shared/constants/numberOfLastMatches.constants';
import { ILine } from '../../shared/interfaces/line.interface';
import { testArray } from './test';
import { ILineType } from '../../shared/interfaces/lineType.interface';
import { testArray2 } from './test2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('slideToggle', [
      state('closed', style({ height: '0px', overflow: 'hidden', opacity: 0 })),
      state('open', style({ height: '*', overflow: 'hidden', opacity: 1 })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  private debounceSearchLinesTimer: ReturnType<typeof setTimeout>;

  public competitions: ICompetition[];
  public selectedCompetitionName: string;
  public selectedMatchIndex: number | null;
  public selectedMatchId: number | null;
  public numberOfLastMatchesFilterControl: FormControl;
  public numberOfLastMatchesFilter: typeof numberOfLastMatchesFilter;
  public lines: ILine[];
  public filteredLines: ILine[];
  public lineTypes: ILineType[];
  public selectedLineTypeId: number;

  constructor(
    private competitionsService: CompetitionsService,
    private linesService: LinesService
  ) {
    this.debounceSearchLinesTimer = null as any;

    this.competitions = [];
    this.selectedCompetitionName = '';
    this.selectedMatchIndex = null;
    this.selectedMatchId = null;
    this.numberOfLastMatchesFilterControl = new FormControl('Last10');
    this.numberOfLastMatchesFilter = numberOfLastMatchesFilter;
    this.lines = testArray;
    this.filteredLines = testArray;
    this.lineTypes = testArray2;
    this.selectedLineTypeId = 1;
  }

  private getCompetitions(): void {
    const onGetCompetitionsError = (error: HttpErrorResponse): void => {
      console.error('[DashboardComponent.onGetCompetitionsError]', error);
    };

    const onGetCompetitionsSuccess = (response: ICompetition[]): void => {
      this.competitions = response;
    };

    this.competitionsService.getCompetitions(1)
      .subscribe({
        error: onGetCompetitionsError.bind(this),
        next: onGetCompetitionsSuccess.bind(this)
      });
  }

  private getLineTypes(): void {
    const onGetLineTypesError = (error: HttpErrorResponse): void => {
      console.error('[DashboardComponent.onGetLineTypesError]', error);
    };

    const onGetLineTypesSuccess = (response: ILineType[]): void => {
      this.lineTypes = response;
    };

    this.linesService.getLineTypes(1)
      .subscribe({
        error: onGetLineTypesError.bind(this),
        next: onGetLineTypesSuccess.bind(this)
      });
  }

  private getLinesLive(): void {
    const onGetLinesLiveError = (error: HttpErrorResponse): void => {
      console.error('[DashboardComponent.onGetLinesLiveError]', error);
    };

    const onGetLinesLiveSuccess = (response: ILine[]): void => {
      this.lines = response;
    };

    const filterData: any = {
      matchId: this.selectedMatchId,
      numberOfLastMatchesFilter: this.numberOfLastMatchesFilterControl.value
    };

    this.linesService.getLinesLive(filterData)
      .subscribe({
        error: onGetLinesLiveError.bind(this),
        next: onGetLinesLiveSuccess.bind(this)
      });
  }

  private selectFirstMatchOnCompetitionSelected(): void {
    this.selectedMatchIndex = 0;

    this.selectedMatchId = this.competitions.find((competition: ICompetition): boolean => {
      return competition.name === this.selectedCompetitionName;
    })!.matches[0].id;

    this.getLinesLive();
  }

  public onCompetitionSelected(competitionName: string): void {
    this.selectedCompetitionName = competitionName;

    this.selectedMatchIndex = null;

    this.selectFirstMatchOnCompetitionSelected();
  }

  public getMatches(): IMatch[] {
    return this.competitions.find((competition: ICompetition): boolean => {
      return competition.name === this.selectedCompetitionName;
    })!.matches;
  }

  public toggleMatchCardDropdown(index: number, matchId: number): void {
    this.selectedMatchIndex = this.selectedMatchIndex === index ? null : index;
    this.selectedMatchId = matchId;

    this.getLinesLive();
  }

  public onSeachLinesInput(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;

    if (this.debounceSearchLinesTimer) {
      clearTimeout(this.debounceSearchLinesTimer);
    }

    const filterLines = (): void => {
      this.filteredLines = this.lines.filter((line: ILine): boolean => {
        return line.lineName.includes(value);
      });
    };

    this.debounceSearchLinesTimer = globalThis.setTimeout(filterLines, 500);
  }

  public onNumberOfLastMatchesFilterChanged() {
    this.getLinesLive();
  }

  public onLineTypesChanged(id: number): void {
    this.selectedLineTypeId = id;

    if (this.selectedLineTypeId === 1) {
      this.filteredLines = this.lines;

      return;
    }

    this.filteredLines = this.lines.filter((line: ILine): boolean => {
      return line.lineTypeIds.includes(this.selectedLineTypeId);
    });
  }

  public ngOnInit(): void {
    this.getCompetitions();

    this.getLineTypes();
  }
}
