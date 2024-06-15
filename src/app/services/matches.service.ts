import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private authToken = '5fec5264ffa0406387fcecdf70b4d691';
  private matchesUrl = 'http://api.football-data.org/v4/competitions/EC/matches';
  private scorersUrl = 'http://api.football-data.org/v4/competitions/EC/scorers';

  constructor(private httpClient: HttpClient) { }

  getMatches(): Observable<any> {
    let random = (Math.floor(10000 + Math.random() * 90000)).toString();
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authToken,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.httpClient.get(`${this.matchesUrl}`, { headers });
  }

  getScorers(): Observable<any> {
    const salt = (new Date()).getTime();
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authToken,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.httpClient.get(`${this.scorersUrl}`, { headers });
  }
}
