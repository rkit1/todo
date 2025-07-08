import { Component, inject, signal, ViewChild, viewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataProvider } from '../data-provider';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  readonly dataProvider = inject(DataProvider);
  readonly router = inject(Router);

  readonly title = signal('');
  readonly description = signal('');
  readonly status = signal<'complete' | 'incomplete'>('incomplete');

  @ViewChild('form') form!: NgForm;

  create(event: SubmitEvent) {
    this.dataProvider.createTask({
      id: Date.now(),
      title: this.title(),
      description: this.description(),
      status: this.status(),
    });
    
    this.router.navigate(['/tasks']);
  }
}
