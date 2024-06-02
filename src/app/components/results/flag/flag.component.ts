import { Component, Input, OnChanges, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'flag-svg',
  template: `<div id="container" [innerHTML]="svgIcon"></div>`,
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent implements OnChanges {

  @Input()
  public id?: string;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
  }

  public ngOnChanges(): void {
    if (!this.id) {
      this.svgIcon = '';
      return;
    }
    this.httpClient
      .get(`/assets/flags/${this.id}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }

}
