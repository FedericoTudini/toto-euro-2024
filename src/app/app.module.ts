import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatchesService } from './services/matches.service';
import { HttpHandler, HttpRequest, HttpClient, HttpInterceptor,HttpClientModule, provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch  } from '@angular/common/http';
import { MatCommonModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FormatGroupNamePipe } from './pipes/format-group-name.pipe';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ResultsComponent } from './components/results/results.component';
import { FlagComponent } from './components/results/flag/flag.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { MatTableModule } from '@angular/material/table';
import { ScorersComponent } from './components/scorers/scorers.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { MatchCardComponent } from './components/results/match-card/match-card.component';
import { GroupStageMatchesComponent } from './components/predictions/group-stage-matches/group-stage-matches.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RoundQualifiedComponent } from './components/predictions/round-qualified/round-qualified.component';
import { AntepostComponent } from './components/predictions/antepost/antepost.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransformStatusPipe } from './pipes/transform-status.pipe';
import { CacheInterceptorService } from './services/cache-interceptor.service';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    FormatGroupNamePipe,
    HomepageComponent,
    PredictionsComponent,
    ResultsComponent,
    FlagComponent,
    FormatDatePipe,
    ScorersComponent,
    MatchCardComponent,
    GroupStageMatchesComponent,
    RoundQualifiedComponent,
    AntepostComponent,
    TransformStatusPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCommonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
