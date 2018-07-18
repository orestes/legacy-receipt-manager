import { Component, EventEmitter, Input, Output } from '@angular/core';

// Dependencies
import { MatSelectChange } from '@angular/material';

// Models
import { Receipt } from 'src/app/models/receipt';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.sass']
})
export class ReceiptComponent {

  @Input('receipt') receipt: Receipt;
  @Input('categories') categories: string[];
  @Output('updated') updated: EventEmitter<Receipt> = new EventEmitter<Receipt>();
  @Output('deleted') deleted: EventEmitter<void> = new EventEmitter<void>();

  public deleteReceipt() {
    this.deleted.emit();
  }

  changed(event: MatSelectChange) {
    if (!event.value) {
      return;
    }
    this.setCategory(event.value);
  }

  public createCategory() {
    const newCategory = prompt('Category name');

    if (!newCategory) {
      return;
    }

    this.setCategory(newCategory);
  }

  private setCategory(category: string) {
    const newReceipt: Receipt = {
      ...this.receipt,
      category: category,
    };

    this.updated.emit(newReceipt);
  }

}
