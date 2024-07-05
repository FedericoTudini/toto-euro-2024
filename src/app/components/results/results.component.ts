import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { format, isSameDay, parseISO } from 'date-fns';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  public matches: any[] = []
  public matchesFiltered: any[] = []
  public todaysMatches: any[] = []
  public isMatchday: boolean = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private matchesService: MatchesService) {}

  public groupedItems: { [key: string]: any[] } = {};
  
  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.matchesService.getMatches().subscribe(
      (data : any) => {
        this.matches = data.matches
        this.matchesFiltered = this.matches.filter((m: any) => ['GROUP_STAGE', 'LAST_16', 'QUARTER_FINALS'].includes(m.stage))
        this.todaysMatches = this.matches.filter((m: any) => isSameDay(parseISO(m.utcDate), new Date()) ) 
        this.isMatchday = this.todaysMatches.length > 0;
        this.groupItemsByDate();
      }
    )
  }

  public filterGroup(group: string) {
    this.matchesFiltered = this.matches.filter((m: any) => m.stage === 'GROUP_STAGE' && m.group === `GROUP_${group}`)

  }

  public reset(stage: string) {
    this.matchesFiltered = this.matches.filter((m: any) => m.stage === stage)
  }

  groupItemsByDate(): void {
    this.matchesFiltered.forEach(match => {
      const dateOnly = format(parseISO(match.utcDate), 'dd/MM/yyyy'); 
      if (!this.groupedItems[dateOnly]) {
        this.groupedItems[dateOnly] = [];
      }
      this.groupedItems[dateOnly].push(match);
    });
  }

  getDates(): string[] {
    return Object.keys(this.groupedItems);
  }

}
