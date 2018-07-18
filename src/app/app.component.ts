import { Component, OnInit } from '@angular/core';

// Rx
import { BehaviorSubject, Observable } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

// Service dependencies
import { ReceiptsService } from 'src/app/services/receipts.service';

// Models
import { Receipt } from './models/receipt';
import { Filters } from './models/filters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {

  public receipts$: Observable<Receipt[]>;
  public categories$: Observable<string[]>;

  private filters$: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({});

  constructor(
    private receiptsService: ReceiptsService,
  ) { }

  ngOnInit(): void {
    this.receipts$ = this.filters$.pipe(
      switchMap((filters: Filters) => this.receiptsService.getReceipts(filters)),
      share(),
    );

    this.categories$ = this.receiptsService.getCategories();
  }

  public deleteReceipt(receipt: Receipt) {
    this.receiptsService.deleteReceipt(receipt.id);
  }

  public updateReceipt(receipt: Receipt) {
    this.receiptsService.updateReceipt(receipt.id, receipt);
  }

  public filtered(state: Filters) {
    this.filters$.next(state);
  }
}

