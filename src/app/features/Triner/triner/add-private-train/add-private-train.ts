import { Component, computed, inject, signal } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { SerchTrainer } from '../serch-trainer/serch-trainer';
import { PlayerSelect } from '../../../Players/player-select/player-select';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { PrivateTrainSub } from '../../../model/Triner.dto';
import { TrainerService } from '../Servies/Triners.servies';
function clubShareValidator(group: AbstractControl): ValidationErrors | null {
  const price = Number(group.get('pricepermonth')?.value ?? 0);
  const share = Number(group.get('TheClubsShare')?.value ?? 0);
  return share > price ? { shareExceedsPrice: true } : null;
}
@Component({
  selector: 'app-add-private-train',
  imports: [SerchTrainer, PlayerSelect, ReactiveFormsModule],
  templateUrl: './add-private-train.html',
  styleUrl: './add-private-train.css',
})
export class AddPrivateTrain {
  private subscriptionService = inject(TrainerService);

  playerId = signal<number>(0);
  trainerId = signal<number>(0);

  form = signal({
    pricepermonth: 0,
    TheClubsShare: 0,
  });

  errors = signal<Record<string, string>>({});
  saveError = signal('');
  isSaving = signal(false);
  successMessage = signal('');

  // ---------- حسابات الملخص ----------
  trainerShare = computed(() => {
    const f = this.form();
    return Math.max(f.pricepermonth - f.TheClubsShare, 0);
  });

  clubPercent = computed(() => {
    const f = this.form();
    return f.pricepermonth > 0
      ? Math.min(Math.round((f.TheClubsShare / f.pricepermonth) * 100), 100)
      : 0;
  });

  trainerPercent = computed(() => (this.form().pricepermonth > 0 ? 100 - this.clubPercent() : 0));

  // ---------- استقبال القيم من مكوّنات الاختيار ----------
  onPlayerSelected(id: number): void {
    this.playerId.set(id);
    this.errors.update((current) => ({ ...current, playerId: '' }));
  }

  onTrainerSelected(id: number): void {
    this.trainerId.set(id);
    this.errors.update((current) => ({ ...current, trainerId: '' }));
  }

  onFieldChange(field: 'pricepermonth' | 'TheClubsShare', value: number) {
    const safe = Number.isFinite(value) ? value : 0;
    this.form.update((current: any) => ({ ...current, [field]: safe }));
    this.errors.update((current: any) => ({ ...current, [field]: '', shareExceedsPrice: '' }));
  }

  private validate(): boolean {
    const f = this.form();
    const newErrors: Record<string, string> = {};

    if (!this.playerId()) newErrors['playerId'] = 'اللاعب مطلوب';
    if (!this.trainerId()) newErrors['trainerId'] = 'المدرب مطلوب';
    if (!f.pricepermonth || f.pricepermonth <= 0)
      newErrors['pricepermonth'] = 'أدخل سعرًا صحيحًا أكبر من صفر';
    if (f.TheClubsShare < 0) newErrors['TheClubsShare'] = 'حصة النادي غير صحيحة';
    if (f.TheClubsShare > f.pricepermonth)
      newErrors['shareExceedsPrice'] = 'حصة النادي أكبر من السعر الشهري';

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  onSubmit() {
    this.successMessage.set('');
    if (!this.validate()) return;
    const f = this.form();

    const dto: PrivateTrainSub = {
      playerId: this.playerId(),
      trainerId: this.trainerId(),
      pricePerMonth: f.pricepermonth,
      clubShare: f.TheClubsShare,
    };
    console.log('dto المرسل:', dto);

    this.isSaving.set(true);
    this.saveError.set('');

    // ⚠️ أضف هذه الدالة في SubServies (أو في service مستقل) وعدّل الـ endpoint
    this.subscriptionService.addPrivateTrainSub(dto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set('تمت إضافة اشتراك التدريب الخاص بنجاح!');
        this.resetForm();
      },
      error: (err: unknown) => {
        console.log('خطأ من الباك:', err);
        this.isSaving.set(false);
        this.saveError.set('حدث خطأ أثناء الحفظ، حاول مجددًا');
      },
    });
  }

  resetForm() {
    this.form.set({ pricepermonth: 0, TheClubsShare: 0 });
    this.playerId.set(0);
    this.trainerId.set(0);
    this.errors.set({});
  }
}
