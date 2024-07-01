import { ChartService } from './../../services/chart.service';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Players } from '../../interfaces/players';
import { playersData } from '../../data/players-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatchesService } from '../../services/matches.service';
import { error } from 'console';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  public playersData: Players[] = playersData
  public displayedColumns: string[] = ['position', 'name', 'score', '1X2'];
  public dataSource!: MatTableDataSource<Players>;
  public matches!: any[];
  public spinner: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matchesService: MatchesService, private chartService: ChartService) {

  }

  ngOnInit(): void {
    this.loadMatches();
  }

  public loadMatches() {
    this.matchesService.getMatches().subscribe(
      (data: any) => {
        this.matches = data.matches
        this.chartService.calculateTable(this.matches, playersData)
        this.dataSource = new MatTableDataSource<Players>(this.playersData.sort((a: Players, b: Players) => b.score - a.score))
        this.dataSource.sort = this.sort;
        this.spinner = false
      }
    )
  }

}
