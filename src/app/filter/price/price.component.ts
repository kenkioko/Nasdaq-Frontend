import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  options = [
    {
      'key': 'closing',
      'text': 'Closing Price',
    },
    {
      'key': 'closing_adj',
      'text': 'Adj. Closing Price'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
