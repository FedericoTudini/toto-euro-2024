import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'transformStatus'
})
export class TransformStatusPipe implements PipeTransform {

  transform(value: any, match: any): string {
    switch (match.status) {
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
        return `${format(parseISO(match.utcDate), 'dd/MM/yyyy')} ${parseISO(match.utcDate).getHours()}:${parseISO(match.utcDate).getUTCMinutes()}0`
        break;
    }
  }

}
