// add-player.ts
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { CreatePlayerDto } from '../../model/player.dto';
import { PlayerService } from '../../services/player.service';
import { AppButton } from '../../../shared/app-button/app-button';
import { Router } from '@angular/router';
interface PlayerFormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateJoin: string;
  type: string;
}

type FormErrors = Partial<Record<keyof PlayerFormState, string>>;
@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule, CustomInput, AppButton],
  templateUrl: './add-player.html',
})
export class AddPlayer {
  private playerService = inject(PlayerService);
  private router = inject(Router); // 1. حالة الفورم كاملة بكائن واحد
  form = signal<PlayerFormState>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateJoin: '',
    type: '',
  });
  successMessage = signal<string | null>(null);
  // 2. حالة الأخطاء كاملة بكائن واحد أيضًا
  errors = signal<FormErrors>({});

  // 3. حالة الحفظ (Loading)
  isSaving = signal<boolean>(false);

  // 4. دالة واحدة عامة تتعامل مع أي حقل
  onFieldChange<K extends keyof PlayerFormState>(field: K, value: string): void {
    this.form.update((current) => ({ ...current, [field]: value }));

    // إلغاء الخطأ فور ما المستخدم يكتب قيمة صحيحة بنفس الحقل
    if (value.trim().length > 0) {
      this.errors.update((current) => {
        const updated = { ...current };
        delete updated[field];
        return updated;
      });
    }
  }

  // 5. التحقق قبل الإرسال
  private validate(): boolean {
    const current = this.form();
    const newErrors: FormErrors = {};

    if (!current.firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!current.lastName.trim()) newErrors.lastName = 'اسم العائلة مطلوب';
    if (!current.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!current.dateJoin.trim()) newErrors.dateJoin = 'تاريخ الانضمام مطلوب';
    if (!current.type.trim()) newErrors.type = 'نوع اللاعب مطلوب';

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // 6. الحفظ الفعلي
  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const current = this.form();

    const dto: CreatePlayerDto = {
      firstName: current.firstName,
      lastName: current.lastName,
      phone: current.phone,
      email: current.email.trim() ? current.email : null,
      dateJoin: current.dateJoin,
      type: current.type,
    };

    this.isSaving.set(true);

    this.playerService.addPlayer(dto).subscribe({
      next: (playerID) => {
        this.isSaving.set(false);
        console.log(playerID);
        this.router.navigate(['/subscriptions/add', playerID]);

        setTimeout(() => this.successMessage.set(null), 3000);
        this.resetForm();
      },
      error: () => {
        this.isSaving.set(false);
        this.errors.set({ firstName: 'حدث خطأ أثناء الحفظ، حاول مجددًا' });
      },
    });
  }

  private resetForm(): void {
    this.form.set({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      dateJoin: '',
      type: '',
    });
    this.errors.set({});
  }
}
