import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private authToken = '5fec5264ffa0406387fcecdf70b4d691';
  private matchesUrl = 'http://api.football-data.org/v4/competitions/EC/matches';
  private scorersUrl = 'http://api.football-data.org/v4/competitions/EC/scorers';
  private randomUrl = 'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5'

  constructor(private httpClient: HttpClient) { }

  getMatches(): Observable<any> {
    return this.httpClient.get(`${this.matchesUrl}`);
  }

  getScorers(): Observable<any> {
    return this.httpClient.get(`${this.scorersUrl}`);
  }

  getRandom(): Observable<any> {
    //let params = new HttpParams().set('id', '123')
    return this.httpClient.get(this.randomUrl)
  }
}
