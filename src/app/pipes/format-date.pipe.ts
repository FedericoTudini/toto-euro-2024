import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return format(date, "dd/MM/yyyy HH:mm", { locale: it });
  }

}
