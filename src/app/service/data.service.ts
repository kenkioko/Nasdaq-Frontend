import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selected_index: any | undefined;
  selected_index_data: any | undefined;

  constructor() { }

  setIndex(index: any) {
    this.selected_index = index;
  }

  getIndex() {
    return this.selected_index;
  }

  setIndexData(data: any) {
    this.selected_index_data = data;
  }

  getIndexData() {
    return this.selected_index_data;
  }
}
