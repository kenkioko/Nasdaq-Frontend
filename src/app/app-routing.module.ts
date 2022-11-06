import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendComponent } from './trend/trend.component';

const routes: Routes = [
  {
    path: ':trend_code',
    component: TrendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
