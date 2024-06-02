import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ResultsComponent } from './components/results/results.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ScorersComponent } from './components/scorers/scorers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: 'predictions',
        component: PredictionsComponent
      },
      {
        path: 'scorers',
        component: ScorersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
