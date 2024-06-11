import { ChartService } from './../../services/chart.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Players } from '../../interfaces/players';
import { playersData } from '../../data/players-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  public playersData: Players[] = playersData
  public displayedColumns: string[] = ['position', 'name', 'score'];
  public dataSource!: MatTableDataSource<Players>;
  public matches!: any[];

  constructor(private matchesService: MatchesService, private chartService: ChartService) {

  }

  ngOnInit(): void {
    this.loadMatches();
  }

  public loadMatches() {
    this.matchesService.getMatches().subscribe(
      (data: any) => {
        this.matches = data.matches.filter((m: any) => m.stage === 'GROUP_STAGE')
        this.chartService.calculateTable(this.matches, playersData)
      }
    )
    this.dataSource = new MatTableDataSource<Players>(this.playersData)
  }

}
