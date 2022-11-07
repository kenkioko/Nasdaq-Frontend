import { Component, OnInit, AfterViewInit, DoCheck, ViewChild, ElementRef, Input } from '@angular/core';

import Chart from 'chart.js/auto';

import { DataService } from '../service/data.service';
import { LooseObject } from '../utility/loose-object';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef;
  @Input() company!: any;

  private graph_data: any | undefined;
  private graph: any | undefined;

  graph_div_id = 'trend-graph';

  constructor(private dataService: DataService) { }

  createGraph() {
    const ctx = this.canvas.nativeElement;

    let labels: any[] = [];
    let datasets: any[] = [];

    // if (this.graph_data) {
    const structured = this.structureData();
    console.log(structured);



    labels = structured.labels;
    datasets = structured.datasets;
    // }

    this.graph = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      // options: {
      //   parsing: {
      //     xAxisKey: 'id',
      //     yAxisKey: 'nested.value'
      //   }
      // }
    });
  }

  private structureData() {
    const column_names = [
      "Date",
      "Open",
      "High",
      "Low"
    ];

    const data = [
      [
        "2015-05-28",
        9.58,
        10.17,
        12.96
      ],
      [
        "2015-05-27",
        9.53,
        10.13,
        12.97
      ],
      [
        "2015-05-26",
        9.526415957480097,
        10.11017545854056,
        12.982029225784581
      ],
    ];

    // 
    var columns: any[] = column_names.slice(1);
    var dataset_data: any = [];
    var labels: any = [];


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
    this.graph_data = this.dataService.getIndexData();
  }

  ngAfterViewInit(): void {
    this.createGraph();
    // this.Graph()
  }

  ngDoCheck(): void {
    const shouldUpdate = () => {
      let update = false;

      try {
        const has_company = this.company && this.company.hasOwnProperty('code');
        const has_data = this.graph_data && this.graph_data.hasOwnProperty('dataset');

        if (has_company && has_data) {
          update = (this.company.code !== this.graph_data.dataset.dataset_code);
        }
        else if (has_company && !has_data) {
          update = true;
        }
      } catch (error) {
        // ignore
        update = false;
      }

      return update;
    }

    if (shouldUpdate()) {
      // destroy existing chart first
      if (this.graph) {
        this.graph.destroy();
      }

      // this.graph_data = this.dataService.getIndexData();
      // this.createGraph();
    }
  }

}
