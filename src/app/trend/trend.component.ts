import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {
  company = {
    name: "svstr",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
