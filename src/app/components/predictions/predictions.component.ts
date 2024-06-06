import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent implements OnInit {

  public matches!: any[];

  constructor(private matchesService: MatchesService) {

  }

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data : any) => {
        this.matches = data.matches
       // this.groupItemsByDate();
      }
    )
  }

}
