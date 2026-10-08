import { Component, Input, OnInit, signal, inject, effect } from '@angular/core';
import { CreateDtoSub, Branch, SubscriptionType } from '../../model/create-dto-sub';
import { SubServies } from '../sub.service';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { ActivatedRoute } from '@angular/router';
import { PlayerSelect } from '../../Players/player-select/player-select';
@Component({
  selector: 'app-add-subscription',
  imports: [CustomInput, PlayerSelect],
  templateUrl: './add-subscription.html',
  styleUrl: './add-subscription.css',
})
export class AddSubscription implements OnInit {
  private route = inject(ActivatedRoute);
  private subscriptionService = inject(SubServies);
  playerId = signal<number>(0);
  d = new Date();
  today = `${this.d.getFullYear()}-${String(this.d.getMonth() + 1).padStart(2, '0')}-${String(this.d.getDate()).padStart(2, '0')}`;
  private countLogger = effect(() => {
    console.log(' id player:', this.playerId());
  });
  branches = signal<Branch[]>([]);
  types = signal<SubscriptionType[]>([]);
  testid = signal<number | null>(null);

  onPlayerSelected(i22d: number): void {
    this.playerId.set(i22d);
  }
  form = signal({
    paymentMethod: '',
    branchesId: 0,
    typeSubId: 0,
  });

  errors = signal<Record<string, string>>({});
  saveError = signal('');
  isSaving = signal(false);
  successMessage = signal('');

  ngOnInit() {
    this.subscriptionService.getBranches().subscribe((data) => this.branches.set(data));
    this.subscriptionService.getTypes().subscribe((data) => this.types.set(data));
  }

  onFieldChange(field: string, value: string | number) {
    this.form.update((current) => ({ ...current, [field]: value }));
    this.errors.update((current) => ({ ...current, [field]: '' }));
  }

  private validate(): boolean {
    const f = this.form();
    const newErrors: Record<string, string> = {};

    if (!f.paymentMethod) newErrors['paymentMethod'] = 'طريقة الدفع مطلوبة';
    if (!f.branchesId) newErrors['branchesId'] = 'الفرع مطلوب';
    if (!f.typeSubId) newErrors['typeSubId'] = 'نوع الاشتراك مطلوب';

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  onSubmit() {
    if (!this.validate()) return;

    const f = this.form();

    const dto: CreateDtoSub = {
      paymentMethod: f.paymentMethod,
      branchesId: f.branchesId,
      typeSubId: f.typeSubId,
      playerId: this.playerId(),
    };
    console.log('dto المرسل:', dto);

    this.isSaving.set(true);
    this.saveError.set('');
    console.log('this what sent ', dto);
    console.log(' id player = ', this.playerId);
    this.subscriptionService.addSubscription(dto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set('تمت إضافة الاشتراك بنجاح!');
        this.resetForm();
      },
      error: (err) => {
        console.log('خطأ من الباك:', err);
        this.isSaving.set(false);
        this.saveError.set('حدث خطأ أثناء الحفظ، حاول مجددًا');
      },
    });
  }

  private resetForm() {
    this.form.set({ paymentMethod: '', branchesId: 0, typeSubId: 0 });
    this.errors.set({});
  }
}
