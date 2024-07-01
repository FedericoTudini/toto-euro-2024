import { ChartService } from './../../../services/chart.service';
import { Component, Input } from '@angular/core';
import { playersData } from '../../../data/players-data';
import { MatchesService } from '../../../services/matches.service';

@Component({
  selector: 'round-qualified',
  templateUrl: './round-qualified.component.html',
  styleUrl: './round-qualified.component.scss'
})
export class RoundQualifiedComponent {

  @Input()
  public matches!: any[];
  public playerPredictions: any[] = playersData;

  constructor(private chartService: ChartService) {
    
  }

  divideInCoppie(array: any[]): any[][] {
    let risultato = [];
    for (let i = 0; i < array.length; i += 2) {
      risultato.push(array.slice(i, i + 2));
    }
    return risultato;
  }

  isQualifiedOttavi(team: any) {
    return this.chartService.isTeamQualifiedOttavi(team)
  }
  isQualifiedQuarti(team: any) {
    return this.chartService.isTeamQualifiedQuarti(team)
  }

  isSameSpot(team: any) {
    return this.chartService.isSameSpot(team)
  }

  



}
