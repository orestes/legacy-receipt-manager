import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// Rx
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Dependencies
import { uniq, sumBy } from 'lodash';

// Models
import { Metric } from 'src/app/models/metric';
import { Receipt } from 'src/app/models/receipt';

// Config
import { locale } from 'src/app/locale/es-ES';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit, OnChanges {

  @Input('receipts') receipts: Receipt[];

  public metrics$: Observable<Metric[]>;
  public total$: Observable<string>;

  private receipts$: Subject<Receipt[]> = new Subject<Receipt[]>();

  constructor() { }

  ngOnInit() {
    this.metrics$ = this.receipts$.pipe(
      map((list: Receipt[]) => this.getAggregation(list))
    );
    this.total$ = this.receipts$.pipe(
      map((list: Receipt[]) => this.addTotals(list)),
      map(locale.format('$.2f')),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.receipts$.next(this.receipts);
  }

  private getAggregation(list: Receipt[]): Metric[] {
    console.log('Aggregating ...', {list});
    return this
      .getUniqueCategories(list)
      .map((category: string) => this.aggregateByCategory(list, category));
  }

  private aggregateByCategory(list: Receipt[], category: string): Metric {
    const matching: Receipt[] = list.filter(receipt => receipt.category === category);

    return {
      category: category,
      total: sumBy(matching, (r: Receipt) => r.total),
      count: matching.length,
    };
  }

  private getUniqueCategories(list: Receipt[]): string[] {
    return uniq(list.map(o => o.category));
  }

  private addTotals(list: Receipt[]): number {
    return list.reduce((total, r) => total + r.total, 0);
  }

}
