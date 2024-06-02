import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  public matches: any[] = []

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data : any) => {
        console.log(data.matches.filter((m: any) => m.group === 'GROUP_A'))
        this.matches = data.matches.filter((m: any) => m.stage === 'GROUP_STAGE')
      }
    )
  }

}
