import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Players } from '../../interfaces/players';
import { playersData } from '../../data/players-data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  public playersData: Players[] = []
  public displayedColumns: string[] = ['position', 'name', 'score'];
  public dataSource!: MatTableDataSource<Players>;

  ngOnInit(): void {
    this.playersData = playersData
    this.dataSource = new MatTableDataSource<Players>(this.playersData)
  }

}
