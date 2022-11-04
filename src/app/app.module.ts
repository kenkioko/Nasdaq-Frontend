import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CompanyTrendComponent } from './company-trend/company-trend.component';
import { FilterDateComponent } from './filter-date/filter-date.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { GraphTrendComponent } from './graph-trend/graph-trend.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CompanyTrendComponent,
    FilterDateComponent,
    FilterPriceComponent,
    GraphTrendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
