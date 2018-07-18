import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { Receipt } from 'src/app/models/receipt';

@Component({
  selector: 'app-receipts-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.sass']
})
export class ReceiptListComponent {

  @Input('receipts') receipts: Receipt[];
  @Input('categories') categories: string[];

  @Output('receiptChanged') receiptChanged: EventEmitter<Receipt> = new EventEmitter<Receipt>();
  @Output('receiptDeleted') receiptDeleted: EventEmitter<Receipt> = new EventEmitter<Receipt>();

  public trackById(receipt: Receipt) {
    return receipt.id;
  }

  public updated(receipt: Receipt) {
    this.receiptChanged.emit(receipt);
  }

  public deleted(receipt: Receipt) {
    this.receiptDeleted.emit(receipt);
  }

}
