import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../service/filter.service';
import { DataProvider } from '../utility/data-provider';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit, DoCheck {
  private dataProvider: DataProvider;
  
  company: any | undefined;
  graph_trend: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService,
  ) {
    this.company = null;
    this.graph_trend = null;
    this.dataProvider = new DataProvider;
  }

  getTrend() {
    // First get the trend code from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const trendCode = routeParams.get('trend_code');

    console.log('get trend', routeParams, trendCode);
    

    // Find the graph trend that correspond with the code provided in route.
    if (trendCode) {
      let company = this.dataProvider.companyList(trendCode);
      this.filterService.setIndex(company);

      console.log('get trend company', company);
    }
    
    // set the selected company data
    this.company = this.filterService.getIndex();
    if (this.company && this.company.hasOwnProperty('code')) {
      this.graph_trend = this.dataProvider.companyData(this.company.code);
    }
  }

  ngOnInit(): void {
    this.getTrend();
  }

  ngDoCheck(): void {
    const current_index = this.filterService.getIndex();

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
        update = false;
      }

      return update;
    }

    if (shouldUpdate()) {
      this.getTrend();
    }
  }
}
