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
    },
    {
      "id": 773,
      "name": "France",
      "group": "2D"
    },
    {
      "id": 765,
      "name": "Portugal",
      "group": "1F"
    },
    {
      "id": 8601,
      "name": "Netherlands",
      "group": "3"
    },
    {
      "id": 803,
      "name": "Turkey",
      "group": "2F"
    }
  ]

  public qualifiedSemifinals: any[] = []

  public mapPlayers = new Map<string, any>()

  constructor() { }

  public calculateTable(matches: any[], playersData: Players[]) {
    playersData.forEach((player) => {
      this.mapPlayers.set(player.name, {
        esiti: [],
        risultati: [],
        ottavi: [],
        posizioni: [],
        quarti: [],
        semi: [],
        esitiCounter: 0,
        risultatiCounter: 0,
        ottaviCounter: 0,
        posizioniCounter: 0,
        quartiCounter: 0,
        semiCounter: 0,
        tot: 0
      })
      //matches outcome
      this.calculateGroupStage(matches, player)
      this.calculateLastSixteen(matches, player)
      this.calculateQuarter(matches, player)
      //qualification
      this.calculateRoundOfSixteen(player)
      this.calculateRoundOfEight(player)
      this.calculateSemi(player)
      this.mapPlayers.get(player.name)["esitiCounter"] = this.mapPlayers.get(player.name)["esiti"].length * 2
      this.mapPlayers.get(player.name)["risultatiCounter"] = this.mapPlayers.get(player.name)["risultati"].length * 5
      this.mapPlayers.get(player.name)["ottaviCounter"] = this.mapPlayers.get(player.name)["ottavi"].length * 5
      this.mapPlayers.get(player.name)["posizioniCounter"] = this.mapPlayers.get(player.name)["posizioni"].length * 5
      this.mapPlayers.get(player.name)["quartiCounter"] = this.mapPlayers.get(player.name)["quarti"].length * 10
      this.mapPlayers.get(player.name)["semiCounter"] = this.mapPlayers.get(player.name)["semi"].length * 15
      this.mapPlayers.get(player.name)["tot"] =  this.mapPlayers.get(player.name)["esitiCounter"] 
      + this.mapPlayers.get(player.name)["risultatiCounter"] 
      + this.mapPlayers.get(player.name)["ottaviCounter"] 
      + this.mapPlayers.get(player.name)["posizioniCounter"] 
      + this.mapPlayers.get(player.name)["quartiCounter"]
      + this.mapPlayers.get(player.name)["semiCounter"]
    })
    console.log(JSON.stringify(Object.fromEntries(this.mapPlayers)))
    return this.mapPlayers
  }

  private calculateGroupStage(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'GROUP_STAGE' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcomeGroup(matches, player)
  }

  private calculateLastSixteen(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'LAST_16' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcomeSixteen(matches, player)
  }
  private calculateQuarter(matches: any[], player: Players) {
    matches = matches.filter((m: any) => m.stage === 'QUARTER_FINALS' && ["IN_PLAY", "PAUSED", "FINISHED"].includes(m.status))
    this.checkMatchesOutcomeQuarter(matches, player)
  }

  private checkMatchesOutcomeGroup(matches: any[], player: Players) {
    player.predictions?.groupStage?.forEach((matchPrediction) => {
      let match = matches.find((m) => m.id === matchPrediction.id)
      if (match !== undefined) {
        if (match.score.winner === matchPrediction.score.winner) {
          player.score += 2
          player.esiti += 1
          this.mapPlayers.get(player.name)["esiti"].push(`GROUP: ${match.homeTeam.name}-${match.awayTeam.name} -> ${match.score.winner}`)
        }
        if (match.score.fullTime.home === parseInt(matchPrediction.score.fullTime.home) && match.score.fullTime.away === parseInt(matchPrediction.score.fullTime.away)) {
          player.score += 5
          player.risultati += 1
          this.mapPlayers.get(player.name)["risultati"].push(`GROUP: ${match.homeTeam.name}-${match.awayTeam.name} -> ${match.score.fullTime.home}-${match.score.fullTime.away}`)
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
          this.mapPlayers.get(player.name)["esiti"].push(`OTTAVI: ${match.homeTeam.name}-${match.awayTeam.name} -> ${match.score.winner}`)
        }
        let score = match.score.fullTime;
        if (match.score.regularTime) {
          score = match.score.regularTime
        }
        if (score.home === parseInt(matchPrediction.score.fullTime.home) && score.away === parseInt(matchPrediction.score.fullTime.away)) {
          player.score += 5
          player.risultati += 1
          this.mapPlayers.get(player.name)["risultati"].push(`OTTAVI: ${match.homeTeam.name}-${match.awayTeam.name} -> ${score.home}-${score.away}`)
        }
      }
    })
  }

  private checkMatchesOutcomeQuarter(matches: any[], player: Players) {
    player.predictions?.quarters?.forEach((matchPrediction) => {
      let match = matches.find((m) => m.id === matchPrediction.id)
      //console.log(match, matchPrediction)
      if (match !== undefined) {
        if (match.score.winner === matchPrediction.score.winner) {
          player.score += 2
          player.esiti += 1
          this.mapPlayers.get(player.name)["esiti"].push(`QUARTI: ${match.homeTeam.name}-${match.awayTeam.name} -> ${match.score.winner}`)
        }
        let score = match.score.fullTime;
        if (match.score.regularTime) {
          score = match.score.regularTime
        }
        if (score.home === parseInt(matchPrediction.score.fullTime.home) && score.away === parseInt(matchPrediction.score.fullTime.away)) {
          player.score += 5
          player.risultati += 1
          this.mapPlayers.get(player.name)["risultati"].push(`QUARTI: ${match.homeTeam.name}-${match.awayTeam.name} -> ${score.home}-${score.away}`)
        }
      }
    })
  }

  private calculateRoundOfSixteen(player: Players) {
    for (let team of player.predictions?.qualifiedRoundOfSixteen) {
      let qualified = this.qualifiedRoundOfSixteen.find((t) => t.id === team.id)
      if (qualified) {
        player.score += 5
        this.mapPlayers.get(player.name)["ottavi"].push(`${team.name}`)
        if (this.isPositionGroupCorrect(qualified.group, team.group)) {
          player.score += 5
          this.mapPlayers.get(player.name)["posizioni"].push(`${team.name} -> ${team.group}`)
        }
      }
    }
  }
  private calculateRoundOfEight(player: Players) {
    for (let team of player.predictions?.qualifiedRoundOfEight) {
      let qualified = this.qualifiedRoundOfEight.find((t) => t.id === team.id)
      if (qualified) {
        player.score += 10
        this.mapPlayers.get(player.name)["quarti"].push(`${team.name}`)
      }
    }
  }
  private calculateSemi(player: Players) {
    for (let team of player.predictions?.qualifiedSemifinals) {
      let qualified = this.qualifiedSemifinals.find((t) => t.id === team.id)
      if (qualified) {
        player.score += 15
        this.mapPlayers.get(player.name)["semi"].push(`${team.name}`)
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
    if (qualified && (qualified.group === team.group || (qualified.group.startsWith("3") && team.group.startsWith("3")))) {
      return true
    }
    return false
  }

  public getMap() {
    return this.mapPlayers
  }


}
