import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private authToken = '5fec5264ffa0406387fcecdf70b4d691';
  private matchesUrl = 'http://api.football-data.org/v4/competitions/EC/matches';
  private scorersUrl = 'http://api.football-data.org/v4/competitions/PL/scorers';

  constructor(private httpClient: HttpClient) { }

  getMatches(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authToken
    });

    return this.httpClient.get(this.matchesUrl, { headers });
  }

  getScorers(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authToken
    });

    return this.httpClient.get(this.scorersUrl, { headers });
  }
}
