import { Component, Input } from '@angular/core';
import { playersData } from '../../../data/players-data';
import { MatchesService } from '../../../services/matches.service';

@Component({
  selector: 'group-stage-matches',
  templateUrl: './group-stage-matches.component.html',
  styleUrl: './group-stage-matches.component.scss'
})
export class GroupStageMatchesComponent {

  @Input()
  public matches!: any[];
  public playerPredictions: any[] = playersData;

  constructor(private matchesService: MatchesService) {

  }

  getPlayerPrediction(id: number, matchesPredictions: any[]) {
    if (!matchesPredictions) return 'error'
    let matchPrediction: any = matchesPredictions.find((match) => match.id === id)
    return `${matchPrediction.score.fullTime.home}:${matchPrediction.score.fullTime.away}`
  }

  public calculateColorScore(match: any, matchesPredictions: any[]) {
    if (!matchesPredictions)  return 'black'
    let matchPrediction: any = matchesPredictions.find((m: any) => m.id === match.id)
    if (!match)  return 'black'
    if (!["IN_PLAY", "PAUSED", "FINISHED"].includes(match.status)) {
      return "transparent"
    }
    else {
      if (this.isSameWinner(match, matchPrediction)) {
        if (this.isSameScore(match, matchPrediction)) {
          return "green"
        }
        else {
          return "grey"
        }
      }
      else {
        return "red"
      }
    }
  }

  public isSameWinner(match: any, matchPrediction: any): boolean {
    return match.score.winner === matchPrediction.score.winner ? true : false
  }

  public isSameScore(match: any, matchPrediction: any): boolean {
    return match.score.fullTime.home === matchPrediction.score.fullTime.home && match.score.fullTime.away === matchPrediction.score.fullTime.away ? true : false
  }

}
