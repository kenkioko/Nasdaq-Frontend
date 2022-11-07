import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() filter = new EventEmitter();

  private provider: any; 

  constructor(private dataService: DataService) { 
    this.provider = new DataProvider;
  }

  onChangeDataset(event: Event, option?: any, index?: number|null) {
    if (this.company && this.company.hasOwnProperty('code')) {
      this.filter.emit({
        column_index: (index) ? index + 1 : null
      });
    }
  }

  ngOnInit(): void {
  }

}
