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
      "id": 803,
      "name": "Turkey",
      "group": "2F"
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
    {
      "id": 816,
      "name": "Austria",
      "group": "1D"
    },
    {
      "id": 773,
      "name": "France",
      "group": "2D"
    },
    {
      "id": 770,
      "name": "England",
      "group": "1C"
    },
    {
      "id": 782,
      "name": "Denmark",
      "group": "2C"
    },
    {
      "id": 811,
      "name": "Romania",
      "group": "1E"
    },
    {
      "id": 805,
      "name": "Belgium",
      "group": "2E"
    },
    {
      "id": 8601,
      "name": "Netherlands",
      "group": "3"
  },
    {
      "id": 777,
      "name": "Slovenia",
      "group": "3"
  },
    {
      "id": 1978,
      "name": "Georgia",
      "group": "3"
  },
    {
      "id": 768,
      "name": "Slovakia",
      "group": "3"
  }
  ]
  public qualifiedRoundOfEight: any[] = [
    {
      "id": 760,
      "name": "Spain",
      "group": "1B"
    },
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
      "id": 770,
      "name": "England",
      "group": "1C"
    }
  ]

  constructor() { }

  public calculateTable(matches: any[], playersData: Players[]) {
    playersData.forEach((player) => {
      //matches outcome
      this.calculateGroupStage(matches, player)
      this.calculateLastSixteen(matches, player)
      //qualification
      this.calculateRoundOfSixteen(player)
      this.calculateRoundOfEight(player)
    })
  }

  private calculateGroupStage(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'GROUP_STAGE' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcomeGroup(matches, player)
  }

  private calculateLastSixteen(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'LAST_16' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcomeSixteen(matches, player)
  }

  private checkMatchesOutcomeGroup(matches: any[], player: Players) {
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
  private checkMatchesOutcomeSixteen(matches: any[], player: Players) {
    player.predictions?.lastSixteen?.forEach((matchPrediction) => {
      let match = matches.find((m) => m.id === matchPrediction.id)
      //console.log(match, matchPrediction)
      if (match !== undefined) {
        if (match.score.winner === matchPrediction.score.winner) {
          player.score += 2
          player.esiti += 1
        }
        let score = match.score.fullTime;
        if (match.score.regularTime) {
          score = match.score.regularTime
        }
        if (score.home === parseInt(matchPrediction.score.fullTime.home) && score.away === parseInt(matchPrediction.score.fullTime.away)) {
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
        player.score += 5
        if (this.isPositionGroupCorrect(qualified.group, team.group)) {
          player.score += 5
        }
      }
    }
  }
  private calculateRoundOfEight(player: Players) {
    for (let team of player.predictions?.qualifiedRoundOfEight) {
      let qualified = this.qualifiedRoundOfEight.find((t) => t.id === team.id)
      if (qualified) {
        player.score += 10
      }
    }
  }

  private isPositionGroupCorrect(groupSrc: string, groupDest: string): boolean {
    return groupSrc === groupDest || (groupSrc.startsWith("3") && groupDest.startsWith("3"))
  }

  public getQualifiedRoundOfSixteen(): any[] {
    return this.qualifiedRoundOfSixteen
  }

  public isTeamQualifiedOttavi(team: any): boolean {
    let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
    return !!qualified
  }
  public isTeamQualifiedQuarti(team: any): boolean {
    let qualified = this.qualifiedRoundOfEight.find((t) => t.id === team.id)
    return !!qualified
  }

  public isSameSpot(team: any): boolean {
    let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
    if(qualified && (qualified.group === team.group || (qualified.group.startsWith("3") && team.group.startsWith("3")))) {
      return true
    }
    return false
  }


}
