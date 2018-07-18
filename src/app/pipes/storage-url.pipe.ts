import { Pipe, PipeTransform } from '@angular/core';

// Rx
import { Observable } from 'rxjs';

// Dependencies
import { AngularFireStorage } from 'angularfire2/storage';

@Pipe({
  name: 'storageUrl',
  pure: true,
})
export class StorageUrlPipe implements PipeTransform {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  transform(fileName: string, args?: any): Observable<string> {

    if (!fileName) {
      return null;
    }

    return this.storage.ref(fileName).getDownloadURL();
  }

}
