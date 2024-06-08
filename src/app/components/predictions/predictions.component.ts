import { Predictions } from './../../interfaces/predictions';
import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { playersData } from '../../data/players-data';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent implements OnInit {

  public matches!: any[];
  public playerPredictions: any[] = playersData;

  constructor(private matchesService: MatchesService) {

  }

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data: any) => {
        this.matches = data.matches.filter((m: any) => m.stage === 'GROUP_STAGE')
        //console.log("players: ", playersData[0].predictions)
        // this.groupItemsByDate();
      }
    )
  }

  getPlayerPrediction(id: number, matchesPredictions: any[]) {
    if (!matchesPredictions) return 'error'
    let matchPrediction: any = matchesPredictions.find((match) => match.id === id)
    return `${matchPrediction.score.fullTime.home}:${matchPrediction.score.fullTime.away}`
  }

}
