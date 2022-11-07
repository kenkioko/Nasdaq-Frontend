import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DataProvider } from 'src/app/utility/data-provider';

@Component({
  selector: 'app-filter-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() company!: any;
  @Input() fromDate!: NgbDate | null;
  @Input() toDate!: NgbDate | null;
  @Output() filter = new EventEmitter();

  hoveredDate: NgbDate | null = null;

  constructor(public formatter: NgbDateParserFormatter) { }

  formatDate(date: NgbDate | null) {
    var date_s: any = String(date);
    if (date instanceof NgbDate) {
      var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      date_s = `${date.day} ${months[date.month]}, ${date.year}`;
    }

    // console.log(date, date_s, this.formatter.format(date));
    // console.log(this.formatter.format(date));

    return date_s;
  }

  private filterByDate() {
    if ((this.fromDate instanceof NgbDate) && (this.toDate instanceof NgbDate)) {
      this.filter.emit({
        start_date: this.formatter.format(this.fromDate),
        end_date: this.formatter.format(this.toDate),
      });
    }
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

    this.filterByDate();
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
