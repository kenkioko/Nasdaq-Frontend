import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selected_index: any | undefined;

  constructor() { }

  setIndex(index: any) {
    this.selected_index = index;
  }

  getIndex() {
    return this.selected_index;
  }
}
