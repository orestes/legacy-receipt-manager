import { Component, EventEmitter, Input, Output } from '@angular/core';

// Dependencies
import { MatDatepickerInputEvent, MatSelectChange } from '@angular/material';

// Models
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {

  @Input('categories') categories: string[];
  @Output('filtered') filtered: EventEmitter<Filters> = new EventEmitter<Filters>();

  private state: Filters = {
    category: null,
    end: null,
    start: null,
  };

  private notifyChanges() {
    this.filtered.emit(this.state);
  }

  public categoryChanged(event: MatSelectChange) {
    this.state.category = event.value;
    this.notifyChanges();
  }

  public startDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.state.start = event.value;
    this.notifyChanges();
  }

  public endDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.state.end = event.value;
    this.notifyChanges();
  }

}
