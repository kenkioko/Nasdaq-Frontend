import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-trend',
  templateUrl: './company-trend.component.html',
  styleUrls: ['./company-trend.component.scss']
})
export class CompanyTrendComponent implements OnInit {
  company = {
    name: "svstr",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
