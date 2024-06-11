import { Players } from '../interfaces/players';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  public calculateTable(matches: any[], playersData: Players[]) {
    this.calculateGroupStage(matches, playersData)
  }

  private calculateGroupStage(matches: any[], playersData: Players[]) {
    matches = matches.filter((m: any) => m.stage === 'GROUP_STAGE' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    playersData.forEach((player) => {
      this.checkMatchesOutcome(matches, player)
    })
  }

  private checkMatchesOutcome(matches: any[], player: Players) {
    //console.log(matches, player)
    player.predictions?.groupStage?.forEach((matchPrediction) => {
      let match = matches.find((m) => m.id === matchPrediction.id)
      //console.log(match.score.winner,  matchPrediction.score.winner)
      //console.log(match, matchPrediction.id)
      if (match !== undefined) {
        if (match.score.winner === matchPrediction.score.winner) {
          player.score += 2
          //console.log('+2', match.score.winner, matchPrediction.score.winner)
        }
        //console.log(match.score.fullTime, matchPrediction.score.fullTime)
        //console.log(match.score.fullTime.home, matchPrediction.score.fullTime.home, match.score.fullTime.away, matchPrediction.score.fullTime.away)
        if (match.score.fullTime.home === matchPrediction.score.fullTime.home && match.score.fullTime.away === matchPrediction.score.fullTime.away) {
          player.score += 5
          //console.log('+5', match.score.fullTime.homeTeam, matchPrediction.score.fullTime.homeTeam)
        }
      }
    })
  }


}
