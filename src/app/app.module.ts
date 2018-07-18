import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Dependencies
import { MaterialModule } from 'src/app/material/material.module';

import { MomentModule } from 'ngx-moment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pipes
import { StorageUrlPipe } from './pipes/storage-url.pipe';

// Environment settings
import { environment } from 'src/environments/environment';

// Components
import { AppComponent } from './app.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { TagsChartComponent } from './components/tags-chart/tags-chart.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { KeysPipe } from './pipes/keys.pipe';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    TagsChartComponent,
    ReceiptListComponent,
    StorageUrlPipe,
    ReceiptComponent,
    KeysPipe,
    FilterComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,

    MomentModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
