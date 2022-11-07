import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

import Chart from 'chart.js/auto';

import { DataService } from '../service/data.service';
import { LooseObject } from '../utility/loose-object';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef;
  @Input() company!: any;
  @Input() company_data!: any;

  private graph: any | undefined;
  graph_div_id = 'trend-graph';

  constructor(private dataService: DataService) { }

  createGraph() {
    const ctx = this.canvas.nativeElement;
    const structured = this.structureData();

    this.graph = new Chart(ctx, {
      type: 'line',
      data: {
        labels: structured.labels,
        datasets: structured.datasets,
      }
    });
  }

  private structureData() {
    var column_names: any[] = [];
    var data: any[] = [];

    if (this.company_data) {
      column_names = this.company_data.dataset.column_names;
      data = this.company_data.dataset.data;
    }

    var dataset_data: any = [];
    var labels: any = [];
    var columns: any[] = column_names.slice(1);


    // structure row data
    var structured_data: any = [];
    data.forEach(item => {
      labels.push(item[0])
      var column_data: LooseObject = {};
      const structured: LooseObject = {
        date: item[0],
        column_data: column_data
      };

      // column data
      columns.forEach((column, index) => {
        const slug = column.toLowerCase();
        structured['column_data'][slug] = item[index + 1];
      });

      structured_data.push(structured);
    });


    // create dataset for each column
    columns.forEach(column => {
      const slug = column.toLowerCase();
      const r_color = () => {
        return Math.floor(Math.random() * 256);
      }

      const dataset = {
        label: column,
        data: structured_data,
        backgroundColor: `rgba(${r_color()}, ${r_color()}, ${r_color()}, 0.2)`,
        borderColor: `rgba(${r_color()}, ${r_color()}, ${r_color()}, 1)`,
        parsing: {
          xAxisKey: column_names[0].toLowerCase(),
          yAxisKey: `column_data.${slug}`
        }
      };

      dataset_data.push(dataset);
    });

    return {
      labels: labels,
      datasets: dataset_data
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  ngOnChanges(): void {
    if (this.company_data) {
      // destroy existing chart first
      if (this.graph) {
        this.graph.destroy();
      }

      this.createGraph();
    }
  }

}
