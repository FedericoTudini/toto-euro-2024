import { Component, Input } from '@angular/core';
import { parseISO } from 'date-fns';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.scss'
})
export class MatchCardComponent {


  @Input()
  public match!: any;

  getTime(match: any): string {
     switch(match.status) {
      case 'IN_PLAY':
        return match.minute
        break
      case 'PAUSED':
        return 'HT'
        break;
      default:
        return `${parseISO(match.utcDate).getHours()}:${parseISO(match.utcDate).getUTCMinutes()}0`
        break;
     }
    
  }

}
