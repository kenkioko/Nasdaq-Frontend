import { Component, OnInit, Input } from '@angular/core';

import { DataProvider } from 'src/app/utility/data-provider';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-filter-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  @Input() company!: any;
  @Input() options!: any;

  constructor(private dataService: DataService) { }

  onChangeDataset(event: Event, option: any) {
    console.log('change view', event, option);
    
  }

  ngOnInit(): void {
  }

}
