import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatGroupName'
})
export class FormatGroupNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Converti la stringa in minuscolo e sostituisci i caratteri di underscore con spazi
    let formattedValue = value.toLowerCase().replace(/_/g, ' ');
    // Capitalizza la prima lettera di ogni parola
    formattedValue = formattedValue.replace(/\b\w/g, char => char.toUpperCase());
    // Rimpiazza "Group" con "Gruppo"
    formattedValue = formattedValue.replace('Group', 'Gruppo');
    return formattedValue;
  }

}