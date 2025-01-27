import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ILine } from '../shared/interfaces/line.interface';
import { ILineType } from '../shared/interfaces/lineType.interface';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  constructor(private http: HttpClient) { }

  public getLineTypes(sportType: number): Observable<ILineType[]> {
    let params: HttpParams = new HttpParams();

    if (typeof sportType === 'number') {
      params = params.append('sportType', sportType);
    }

    return this.http.get<ILineType[]>(`${environment.apiUrl}Line/GetLineTypes`, { params });
  }

  public getLines(filterData: any): Observable<ILine[]> {
    let params: HttpParams = new HttpParams();

    if (typeof filterData.matchId === 'number') {
      params = params.append('matchId', filterData.matchId);
    }

    if (typeof filterData.numberOfLastMatchesFilter === 'string') {
      params = params.append('numberOfLastMatchesFilter', filterData.numberOfLastMatchesFilter);
    }

    return this.http.get<ILine[]>(`${environment.apiUrl}Line/Get`, { params });
  }

  public getLinesLive(filterData: any): Observable<ILine[]> {
    let params: HttpParams = new HttpParams();

    if (typeof filterData.matchId === 'number') {
      params = params.append('matchId', filterData.matchId);
    }

    if (typeof filterData.numberOfLastMatchesFilter === 'string') {
      params = params.append('numberOfLastMatchesFilter', filterData.numberOfLastMatchesFilter);
    }

    return this.http.get<ILine[]>(`${environment.apiUrl}Line/GetLinesLive`, { params });
  }

  public getTestGames(gameId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Line/GetLinesLive?matchId=${gameId}&numberOfLastMatchesFilter=Last10`);
  }
}
