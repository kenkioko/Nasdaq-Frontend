import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../service/data.service';
import { DataProvider } from '../utility/data-provider';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit, DoCheck {
  private dataProvider: DataProvider;
  
  company: any | undefined;
  company_data: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    this.company = null;
    this.dataProvider = new DataProvider;
  }

  getTrend(filter: any = {}) {
    console.log('get trend', filter)
    
    // First get the trend code from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const trendCode = routeParams.get('trend_code');    

    // Find the graph trend that correspond with the code provided in route.
    if (trendCode) {
      this.dataProvider.companyList(trendCode)
        .then(result => {
          this.dataService.setIndex(result);
        });
    }
    
    // set the selected company data
    this.company = this.dataService.getIndex();
    this.company_data = this.dataService.getIndexData();

    if (this.company && this.company.hasOwnProperty('code')) {
      this.dataProvider.companyData(this.company.code, filter)
        .then(result => {
          this.dataService.setIndexData(result);
          this.company_data = this.dataService.getIndexData();
        });
    }
  }

  getColumnNames() {
    var columns: any[] = [];
    if (this.company_data) {
      // remove date column name
      if (this.company_data.hasOwnProperty('dataset')) {
        columns = this.company_data.dataset.column_names.slice(1);
      }
    }

    return columns;
  }

  getDateRange() {
    var range: any = { };

    if (this.company_data) {
      // start date
      if (this.company_data.hasOwnProperty('dataset')) {
        range['from'] = this.company_data.dataset.end_date;
        range['to'] = this.company_data.dataset.start_date;
      }
    }    

    return range;
  }

  ngOnInit(): void {
    this.getTrend();
  }

  ngDoCheck(): void {
    const current_index = this.dataService.getIndex();

    const shouldUpdate = () => {
      let update = false;

      try {
        const has_index = (current_index && current_index.hasOwnProperty('code'));
        const has_company = (this.company && this.company.hasOwnProperty('code'));

        if (has_index && has_company) {
          update = (this.company.code !== current_index.code);
        }
        else if (has_index || has_company) {
          update = true;
        }
        else {
          update = false;
        }
      } catch (error) {
        // ignore
        console.error('Error:', error);
        update = false;
      }

      return update;
    }

    if (shouldUpdate()) {
      this.getTrend();
    }
  }
}
