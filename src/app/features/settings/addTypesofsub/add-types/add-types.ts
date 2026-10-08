import { Component, computed, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SubscriptionTypesService } from '../../subscription-types/subscription-types/Servies/subscription-types.service';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import { CreateTypeSubDto } from '../../../model/create-dto-sub';

import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-types',
  imports: [CustomInput, TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './add-types.html',
  styleUrl: './add-types.css',
})
export class AddTypes {
  private service = inject(SubscriptionTypesService);
  private router = inject(Router);

  // قيم الحقول (الكومبوننت يتعامل معها نصاً)
  timeSpan = signal('');
  durationMonths = signal('');
  price = signal('');

  submitted = signal(false);
  saving = signal(false);
  serverError = signal(false);

  // التحقق
  nameInvalid = computed(() => {
    const v = this.timeSpan().trim();
    return v === '' || v.length > 50;
  });

  durationInvalid = computed(() => {
    const s = this.durationMonths().trim();
    const n = Number(s);
    return s === '' || !Number.isInteger(n) || n < 1;
  });

  priceInvalid = computed(() => {
    const s = this.price().trim();
    const n = Number(s);
    return s === '' || !Number.isFinite(n) || n < 0;
  });

  formInvalid = computed(() => this.nameInvalid() || this.durationInvalid() || this.priceInvalid());

  submit(): void {
    this.submitted.set(true);
    if (this.formInvalid()) return;

    const dto: CreateTypeSubDto = {
      timeSpan: this.timeSpan().trim(),
      durationMonths: Number(this.durationMonths()),
      price: Number(this.price()),
    };

    this.saving.set(true);
    this.serverError.set(false);

    this.service.addType(dto).subscribe({
      next: () => {
        this.saving.set(false);
        alert('suc');
        this.back();
      },
      error: (err) => {
        console.error('Add type error:', err);
        this.saving.set(false);
        this.serverError.set(true);
      },
    });
  }

  back(): void {
    this.router.navigate(['/subscription-types']);
  }
}
