import { Component, OnInit, Input } from '@angular/core';

import { DataProvider } from 'src/app/utility/data-provider';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() company!: any;
  @Input() options!: any;

  constructor(private dataService: DataService) { }

  onChangeDataset(event: Event, option: any) {
    console.log('change view', event, option);
    
  }

  ngOnInit(): void {
  }

}
