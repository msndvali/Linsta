import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompetition } from '../shared/interfaces/competition.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

  public getCompetitions(sportType: number): Observable<ICompetition[]> {
    let params: HttpParams = new HttpParams();

    if (typeof sportType === 'number') {
      params = params.append('sportType', sportType);
    }

    return this.http.get<ICompetition[]>(`${environment.apiUrl}Competition/Get`, { params });
  }
}
