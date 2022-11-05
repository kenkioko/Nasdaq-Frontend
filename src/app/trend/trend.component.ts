import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../service/filter.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {
  company: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService
  ) { 
    this.company = {};
  }

  getTrend() {
    // First get the trend code from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const trendCode = Number(routeParams.get('trendCode'));

    // Find the graph trend that correspond with the code provided in route.
    this.company = this.filterService.getIndex();
    console.log(trendCode, this.company);
  }

  ngOnInit(): void {
    this.getTrend();
  }

}
