import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatchesService } from '../../services/matches.service';

interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601 date string
  nationality: string;
  section: string;
  position: string | null;
  shirtNumber: number | null;
  lastUpdated: string; // ISO 8601 date string
}

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string; // ISO 8601 date string
}

interface Scorer {
  player: Player;
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number;
  penalties: number;
}

@Component({
  selector: 'app-scorers',
  templateUrl: './scorers.component.html',
  styleUrl: './scorers.component.scss'
})
export class ScorersComponent implements OnInit {

  public displayedColumns: string[] = [ 'name', 'team', 'goals'];
  public dataSource!: MatTableDataSource<Scorer>;
  public scorersList: any[] = [];

  constructor(private mathcesService: MatchesService) {
    
  }

  ngOnInit(): void {
    this.loadScorers()
    
  }


  loadScorers() {
    this.mathcesService.getScorers().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<Scorer>(data.scorers)
      }
    )
  }

}
