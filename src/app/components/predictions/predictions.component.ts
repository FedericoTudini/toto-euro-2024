import { Predictions } from './../../interfaces/predictions';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { playersData } from '../../data/players-data';
import { isSameDay, parseISO } from 'date-fns';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent implements OnInit {

  public matches!: any[];
  public playerPredictions: any[] = playersData;
  todaysMatches!: any[];

  constructor(private matchesService: MatchesService) {

  }

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data: any) => {
        this.matches = data.matches.filter((m: any) => m.stage === 'GROUP_STAGE')
        this.todaysMatches = this.matches.filter((m: any) => isSameDay(parseISO(m.utcDate), new Date()) ) 

        //console.log(this.matches)
        //console.log("players: ", playersData[0].predictions)
        // this.groupItemsByDate();
      }
    )
  }

}
