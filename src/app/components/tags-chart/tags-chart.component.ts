import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// Dependencies
import * as c3 from 'c3';
import { FormatLocaleObject } from 'd3-format';

// Settings
import { locale as defaultLocale } from '../../locale/es-ES';

 // Models
import { Metric } from '../../models/metric';

@Component({
  selector: 'app-tags-chart',
  templateUrl: './tags-chart.component.html',
  styleUrls: ['./tags-chart.component.sass']
})
export class TagsChartComponent implements OnInit, OnChanges {

  @Input('data') data: Metric[];
  @Input('locale') locale: FormatLocaleObject = defaultLocale;

  @ViewChild('chart') chartElement: ElementRef;

  private chart;
  private property: keyof Metric = 'total';

  constructor() { }

  ngOnInit() {
    this.chart = c3.generate({
      bindto: this.chartElement.nativeElement,
      data: {
        type: 'pie',
        json: this.getFormattedData(),
      },
      legend: {
        position: 'right',
      },
    });
  }

  private getCurrencyFormatter() {
    return this.locale.format('$.2f');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) {
      return;
    }

    this.chart.load({
      json: this.getFormattedData(),
      unload: true,
    });
  }

  private getFormattedData() {
    return (this.data || []).reduce((carry, metric: Metric) => {
      const label = this.getCurrencyFormatter()(metric[this.property] as number);
      carry[`${metric.category}: ${label}`] = metric[this.property];

      return carry;
    }, {});
  }

}
