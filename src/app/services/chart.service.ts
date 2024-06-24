import { playersData } from '../data/players-data';
import { Players } from '../interfaces/players';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public qualifiedRoundOfSixteen: any[] = [
    {
      "id": 788,
      "name": "Switzerland",
      "group": "2A"
    },
    {
      "id": 759,
      "name": "Germany",
      "group": "1A"
    },
    {
      "id": 765,
      "name": "Portugal",
      "group": "1F"
    },
    {
      "id": 760,
      "name": "Spain",
      "group": "1B"
    },
    {
      "id": 784,
      "name": "Italy",
      "group": "2B"
    },
  ]

  constructor() { }

  public calculateTable(matches: any[], playersData: Players[]) {
    playersData.forEach((player) => {
      this.calculateGroupStage(matches, player)
      this.calculateRoundOfSixteen(player)
    })
  }

  private calculateGroupStage(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'GROUP_STAGE' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcome(matches, player)
  }

  private checkMatchesOutcome(matches: any[], player: Players) {
    player.predictions?.groupStage?.forEach((matchPrediction) => {
      let match = matches.find((m) => m.id === matchPrediction.id)
      if (match !== undefined) {
        if (match.score.winner === matchPrediction.score.winner) {
          player.score += 2
          player.esiti += 1
        }
        if (match.score.fullTime.home === parseInt(matchPrediction.score.fullTime.home) && match.score.fullTime.away === parseInt(matchPrediction.score.fullTime.away)) {
          player.score += 5
          player.risultati += 1
        }
      }
    })
  }

  private calculateRoundOfSixteen(player: Players) {
    for (let team of player.predictions?.qualifiedRoundOfSixteen) {
      let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
      if (qualified) {
        player.score += 10
        if (this.isPositionGroupCorrect(qualified.group, team.group)) {
          player.score += 5
        }
      }
    }
  }

  private isPositionGroupCorrect(groupSrc: string, groupDest: string): boolean {
    return groupSrc === groupDest || (groupSrc.startsWith("3") && groupDest.startsWith("3"))
  }

  public getQualifiedRoundOfSixteen(): any[] {
    return this.qualifiedRoundOfSixteen
  }

  public isTeamQualified(team: any): boolean {
    let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
    return !!qualified
  }

  public isSameSpot(team: any): boolean {
    let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
    if(qualified && qualified.group === team.group) {
      return true
    }
    return false
  }


}
