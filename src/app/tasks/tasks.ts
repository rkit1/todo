import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { DataProvider } from '../data-provider';

@Component({
  selector: 'app-tasks',
  imports: [MatIconModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  readonly dataProvider = inject(DataProvider);
  readonly dialog = inject(MatDialog);

  filter = signal<string|undefined>(undefined);

  tasks = computed(() => {
    let tasks = this.dataProvider.data().tasks;
    const filter = this.filter();

    if (filter !== undefined) {
      const filter1 = filter.toLocaleLowerCase();
      tasks = tasks.filter(task => task.title.toLocaleLowerCase().includes(filter1) || task.description.includes(filter1));
    }

    return tasks;
  })


  delete(id: number) {
    this.dialog.open(ConfirmDialog).afterClosed().subscribe(result => {
      if (result) {
        this.dataProvider.deleteTask(id);
      }
    });
  }
}
