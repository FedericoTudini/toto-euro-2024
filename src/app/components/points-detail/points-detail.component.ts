import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { MatchesService } from '../../services/matches.service';
import { playersData } from '../../data/players-data';
import { Players } from '../../interfaces/players';

@Component({
  selector: 'app-points-detail',
  templateUrl: './points-detail.component.html',
  styleUrl: './points-detail.component.scss'
})
export class PointsDetailComponent implements OnInit {

  public playersMap!: Map<string, any>;
  public playersData: Players[] = playersData

  players: string[] = [
    "Fede",
    "Giovanni",
    "Cataldo",
    "Gabo",
    "Guido",
    "Marino",
    "Fra",
    "Lollo",
    "Andrea",
    "Marco",
    "Lele",
    "Nike"
  ] 

  constructor(private matchesService: MatchesService, private chartService: ChartService) {

  }

  

  ngOnInit(): void {
    this.matchesService.getMatches().subscribe(
      (data: any) => {
        this.playersMap = this.chartService.calculateTable(data.matches, playersData)
      }
    )
    
  }
}
