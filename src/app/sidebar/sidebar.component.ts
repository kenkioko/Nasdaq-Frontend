import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataProvider } from '../utility/data-provider';
import $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title: string;
  listing: any;
  // selected: any;

  constructor() {
    // app title
    let app = new AppComponent;
    this.title = app.title;
  }

  getListing() {
    // company listings
    let provider = new DataProvider()
    provider.companyList((results: any) => {
      this.listing = results.hasOwnProperty('data')
        ? results['data']
        : results;
    });
  }

  onHover(event: Event, toggle: boolean) {
    // // if selected prevent
    // if (toggle === true) {
    //   event.preventDefault();
    // }
    
    if (event.target instanceof Element) {
      let elem = $(event.target);
      
      elem.toggleClass('active', toggle)
        .attr('aria-current', toggle.toString());
    }
  }

  onClick(event: Object) {
    console.log(event);

  }

  ngOnInit(): void {
    this.getListing();
  }

}
