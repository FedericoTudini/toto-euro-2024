import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  public matches: any[] = []
  public matchesFiltered: any[] = []
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data : any) => {
        this.matches = data.matches
        this.matchesFiltered = this.matches.filter((m: any) => m.stage === 'GROUP_STAGE')
      }
    )
  }

  public filterGroup(group: string) {
    this.matchesFiltered = this.matches.filter((m: any) => m.stage === 'GROUP_STAGE' && m.group === `GROUP_${group}`)

  }

  public reset() {
    this.matchesFiltered = this.matches
  }

}
