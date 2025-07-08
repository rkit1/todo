import { Component, computed, effect, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataProvider } from '../data-provider';

@Component({
  selector: 'app-detail',
  imports: [MatFormFieldModule, MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  id = input<string>('id');

  dataProvider = inject(DataProvider);

  task = computed(() =>
    this.dataProvider.data().tasks.find((task) => task.id === Number.parseInt(this.id()))
  );
  complete = computed(() => this.task()?.status === 'complete');

  changeComplete(event: MatCheckboxChange) {
    this.dataProvider.updateTask({ ...this.task()!, status: event.checked ? 'complete' : 'incomplete' });
  }

  constructor() { }
}
