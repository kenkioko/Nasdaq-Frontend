import { Component, OnInit, Input } from '@angular/core';

import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DataProvider } from 'src/app/utility/data-provider';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() company!: any;
  @Input() fromDate!: NgbDate | null;
  @Input() toDate!: NgbDate | null;

  hoveredDate: NgbDate | null = null;

  constructor(public formatter: NgbDateParserFormatter) { }

  formatDate(date: NgbDate | null) {
    // var date_f = Date.parse(this.formatter.format(date));
    // console.log(date_f);

    console.log(date, this.fromDate);
    

    var months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // var d = date_f.getDate();
    // var m = date_f.getMonth();
    // var y = date_f.getFullYear();

    // const date_s =  `${d} ${months[m]}, ${y}`;
    // console.log(date_s, date_f);


    return date;
  }

  private filterByDate() {

    // 
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  ngOnInit(): void {
  }

}
