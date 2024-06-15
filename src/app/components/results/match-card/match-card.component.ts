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
        return "LIVE"
        break
      case 'PAUSED':
        return 'HT'
        break;
        case 'FINISHED':
        return 'FT'
        break;
      default:
        return `${parseISO(match.utcDate).getHours()}:${parseISO(match.utcDate).getUTCMinutes()}0`
        break;
     }
    
  }

  isLive(match: any): boolean {
    return this.getTime(match) === 'LIVE' || this.getTime(match) === 'HT';
  }

}
