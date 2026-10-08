import { Component, inject, signal } from '@angular/core';
import { BranchService } from '../servies/branch.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-branch',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './add-branch.html',
  styleUrl: './add-branch.css',
})
export class AddBranch {
  private branchService = inject(BranchService);

  branchName = signal('');
  branchAddres = signal('');
  branchManger = signal('');

  loading = signal(false);
  error = signal(''); // نخزّن مفتاح الترجمة مو النص
  success = signal(false);

  submit() {
    this.error.set('');
    this.success.set(false);

    const body = {
      branchName: this.branchName().trim(),
      branchAddres: this.branchAddres().trim(),
      branchManger: this.branchManger().trim(),
    };

    // الحقول بالباك null! يعني كلها مطلوبة
    if (!body.branchName || !body.branchAddres || !body.branchManger) {
      this.error.set('branch.allRequired');
      return;
    }

    this.loading.set(true);
    this.branchService.add(body).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.branchName.set('');
        this.branchAddres.set('');
        this.branchManger.set('');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('branch.addFailed');
      },
    });
  }
}
