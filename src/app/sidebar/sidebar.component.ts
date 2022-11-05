import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataProvider } from '../utility/data-provider';
import { FilterService } from '../service/filter.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title: string;
  listing: any;
  selected_target: any;

  constructor(private filterService: FilterService) {
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

  onHover(event: Event, index: any, toggle: boolean) {
    // if selected prevent
    const selected = this.filterService.getIndex();
    const isSelected = (selected && index.code === selected.code);

    if (isSelected && !toggle) {
      event.preventDefault();
      return;
    }

    if (event.target instanceof Element) {
      this.activate(event.target, toggle);     
    }
  }

  onClick(event: Event, index: Object) {
    console.log('click', event);
    
    if (this.selected_target instanceof Element) {
      // remove active target
      this.activate(this.selected_target.parentElement, false);
      console.log('removed', this.selected_target);
    }

    if (event.target instanceof Element) {
      // replace active target
      this.activate(event.target.parentElement, true);

      console.log('added', event.target);
      

      // set the selected trend
      this.selected_target = event.target;
      this.filterService.selectIndex(index);
    }
  }

  activate(target: EventTarget|HTMLElement|null , toggle: boolean) {
    if (target instanceof Element) {
      const elem = $(target);

      elem
        .toggleClass('active', toggle)
        .attr('aria-current', toggle.toString());
    }
  }

  ngOnInit(): void {
    this.getListing();
  }

}
