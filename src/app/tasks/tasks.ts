import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataProvider } from '../data-provider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-tasks',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  readonly dataProvider = inject(DataProvider);
  readonly dialog = inject(MatDialog);

  delete(id: number) {
    this.dialog.open(ConfirmDialog).afterClosed().subscribe(result => {
      if (result) {
        this.dataProvider.deleteTask(id);
      }
    });
  }
}
