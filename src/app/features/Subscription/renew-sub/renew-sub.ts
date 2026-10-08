import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubServies } from '../sub.service';
import { AuthService } from '../../../core/services/auth.service';
// استبدل باسم خدمتك التي فيها getTypes() وموديلها SubscriptionType
import { RenewSubRequest, SubEXDto, SubscriptionType } from '../../model/create-dto-sub';
import { TypeSubDto } from '../../model/create-dto-sub';
import { dashboardservies } from '../../dashboard/Servies/dashboard.servies';
import { Branch } from '../../model/create-dto-sub';
function todayLocal(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

@Component({
  selector: 'app-renew-sub',
  imports: [],
  templateUrl: './renew-sub.html',
  styleUrl: './renew-sub.css',
})
export class RenewSub {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private subService = inject(SubServies);
  private auth = inject(AuthService);
  private daschSERvies = inject(dashboardservies);
  oldSubId = Number(this.route.snapshot.paramMap.get('subId'));

  oldSub = signal<SubEXDto | null>(null);
  types = signal<SubscriptionType[]>([]);

  typeSubId = signal(0);
  startDate = signal(todayLocal()); // يُملأ بتاريخ اليوم ويمكن تعديله
  paymentMethod = signal('Cash');
  paymentMethods = ['Cash', 'Card', 'Transfer']; // عدّلها حسب القيم التي يقبلها نظامك

  errors = signal<Record<string, string>>({});
  loading = signal(true);
  saving = signal(false);
  serverError = signal('');

  selectedType = computed(() => this.types().find((t) => t.typeSubId === this.typeSubId()));
  branches = signal<Branch[]>([]);
  branchesId = signal(0);
  ngOnInit() {
    this.subService.getBranches().subscribe((b) => this.branches.set(b));
    // أنواع الاشتراك
    this.subService.getTypes().subscribe({
      next: (t) => {
        console.log('types:', t); // القائمة القادمة من الـ API
        console.table(t); // نفس القائمة بشكل جدول، أوضح للقراءة
        this.types.set(t);
      },
      error: (err) => console.error('getTypes failed:', err),
    });

    // بيانات الاشتراك القديم (للعرض فقط)
    this.daschSERvies.GetExpiredSubs().subscribe({
      next: (list) => {
        const found = list.find((s) => s.subid === this.oldSubId) ?? null;
        this.oldSub.set(found);
        this.loading.set(false);
      },
      error: () => {
        this.serverError.set('تعذّر تحميل بيانات الاشتراك');
        this.loading.set(false);
      },
    });
  }

  validate(): boolean {
    const e: Record<string, string> = {};
    if (!this.typeSubId()) e['typeSubId'] = 'اختر نوع الاشتراك';
    if (!this.startDate()) e['startDate'] = 'حدد تاريخ البداية';
    if (!this.branchesId()) e['branchesId'] = 'اختر الفرع';
    if (!this.paymentMethod()) e['paymentMethod'] = 'اختر طريقة الدفع';
    this.errors.set(e);
    return Object.keys(e).length === 0;
  }

  submit() {
    if (!this.validate() || this.saving()) return;
    this.saving.set(true);
    this.serverError.set('');

    this.subService
      .renew({
        oldSubId: this.oldSubId,
        typeSubId: this.typeSubId(),
        startDate: this.startDate(),
        createdby: this.auth.fullName(),
        paymentmethod: this.paymentMethod(),
        branchesId: this.branchesId(),
      })
      .subscribe({
        next: () => this.router.navigate(['/subscriptions/expired']),
        error: (err) => {
          this.serverError.set(err?.error?.message ?? err?.error ?? 'فشل التجديد');
          this.saving.set(false);
        },
      });
  }
}
