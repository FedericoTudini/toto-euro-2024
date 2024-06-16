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

  constructor(private matchesService: MatchesService) {
    
  }

  divideInCoppie(array: any[]): any[][] {
    let risultato = [];
    for (let i = 0; i < array.length; i += 2) {
      risultato.push(array.slice(i, i + 2));
    }
    return risultato;
  }



}
