import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentChangeAction, Query } from 'angularfire2/firestore';

// Rx
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Dependencies
import { uniq } from 'lodash';

// Models
import { Receipt } from 'src/app/models/receipt';
import { Filters } from 'src/app/models/filters';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {

  private collectionName = 'receipts';

  constructor(
    private db: AngularFirestore,
  ) { }

  public getCategories(): Observable<string[]> {
    return this.db.collection(this.collectionName).valueChanges().pipe(
      map((list: Receipt[]) => list.map(r => r.category)),
      map(uniq),
    );
  }

  public getReceipts(filters: Filters) {
    return  this.filterCollection(filters)
      .snapshotChanges().pipe(
        map((actions: DocumentChangeAction<Receipt>[]) => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }),
      );
  }

  private filterCollection(filters: Filters): AngularFirestoreCollection<Receipt> {
    return this.db.collection(this.collectionName, ref => {
      let filtered: CollectionReference | Query = ref;

      if (filters.category) {
        filtered = filtered.where('category', '==', filters.category);
      }

      if (filters.start) {
        filtered = filtered.where('date', '>=', filters.start);
      }

      if (filters.end) {
        filtered = filtered.where('date', '<=', filters.end);
      }

      return filtered;
    });
  }

  public updateReceipt(id: string, receipt: Partial<Receipt>): Promise<void> {
    return this.db.collection(this.collectionName).doc(id).update(receipt);
  }

  public deleteReceipt(id: string): Promise<void> {
    return this.db.collection(this.collectionName).doc(id).delete();
  }

}
