import { Component, Input } from '@angular/core';
import { playersData } from '../../../data/players-data';
import { MatchesService } from '../../../services/matches.service';

@Component({
  selector: 'antepost',
  templateUrl: './antepost.component.html',
  styleUrl: './antepost.component.scss'
})
export class AntepostComponent {
  
  @Input()
  public matches!: any[];
  public playerPredictions: any[] = playersData;

  constructor(private matchesService: MatchesService) {

  }

}
