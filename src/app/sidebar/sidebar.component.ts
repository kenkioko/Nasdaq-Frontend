import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataProvider } from '../utility/data-provider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title: string;
  listing: any;

  constructor() { 
    // app title
    let app = new AppComponent;
    this.title = app.title;
  }

  getListing() {
    // company listings
    let provider = new DataProvider()
    provider.companyList((results: any) => {
      this.listing = results;

      console.log('listing', this.listing);
    });
  }

  ngOnInit(): void {
    this.getListing();
  }

}
