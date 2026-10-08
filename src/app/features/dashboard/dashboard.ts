import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

import { StatCardComponent } from '../../shared/stat-card-component/stat-card-component';
import { MonthRevenueDto, SubEXDto, SubscriptionDto } from '../model/create-dto-sub';
import { dashboardservies } from './Servies/dashboard.servies';
const MONTH_NAMES = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];
@Component({
  selector: 'app-dashboard',
  imports: [StatCardComponent, TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private subService = inject(dashboardservies);
  private router = inject(Router);

  loading = signal(true);
  error = signal('');

  // من الـ API
  activeCount = signal<any>(0);
  expiringSubs = signal<SubscriptionDto[]>([]);
  expiringCount = computed(() => this.expiringSubs().length);

  // بيانات وهمية مؤقتاً (تُستبدل لاحقاً بـ API)
  totalPlayers = signal<any>(0);
  monthRevenue = signal<any>(0);

  // جديد: بيانات الرسم البياني
  revenueData = signal<MonthRevenueDto[]>([]);

  expiredSubs = signal<SubEXDto[]>([]);
  expiredCount = computed(() => this.expiredSubs().length);
  // جديد: نحسب ارتفاع كل عمود نسبةً لأكبر قيمة
  chartBars = computed(() => {
    const data = this.revenueData();
    const max = Math.max(...data.map((d) => d.total), 0);

    return data.map((d, i) => ({
      label: MONTH_NAMES[d.month - 1],
      display: d.total.toLocaleString('en-US'),
      height: max > 0 ? Math.max((d.total / max) * 85, 3) : 3,
      isCurrent: i === data.length - 1,
    }));
  });

  // جديد: إجمالي الأشهر الستة
  revenueSum = computed(() =>
    this.revenueData()
      .reduce((sum, d) => sum + d.total, 0)
      .toLocaleString('en-US'),
  );

  ngOnInit(): void {
    forkJoin({
      active: this.subService.getActiveSubs(),
      expiring: this.subService.getExpiringIn7Days(),
      TotalPlayers: this.subService.GetALLPlayers(),
      monthR: this.subService.GetMonthlyRevenue(),
      revenue: this.subService.getRevenueLast6Months(), // جديد
      expired: this.subService.GetExpiredSubs(), // جديد
    }).subscribe({
      next: ({ active, expiring, TotalPlayers, monthR, revenue, expired }) => {
        // جديد: revenue
        this.activeCount.set(active);
        this.expiringSubs.set(expiring);
        this.totalPlayers.set(TotalPlayers);
        this.monthRevenue.set(monthR);
        this.revenueData.set(revenue); // جديد
        this.expiredSubs.set(expired);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('تعذّر تحميل البيانات، حاول مرة أخرى.');
        this.loading.set(false);
      },
    });
  }

  goToExpiring(): void {
    this.router.navigate(['/players']);
  }

  // نحلل التاريخ يدوياً لتجنب مشاكل فرق التوقيت مع new Date('yyyy-MM-dd')
  daysLeft(dateEnd: string): number {
    const [y, m, d] = dateEnd.split('-').map(Number);
    const end = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((end.getTime() - today.getTime()) / 86_400_000);
  }

  daysLabel(dateEnd: string): string {
    const n = this.daysLeft(dateEnd);
    if (n <= 0) return 'اليوم';
    if (n === 1) return 'غداً';
    if (n === 2) return 'بعد يومين';
    return `بعد ${n} أيام`;
  }
  expiredLabel(dateEnd: string): string {
    const n = Math.abs(this.daysLeft(dateEnd));
    if (n === 1) return 'أمس';
    if (n === 2) return 'منذ يومين';
    if (n <= 10) return `منذ ${n} أيام`;
    return `منذ ${n} يوماً`;
  }
  badgeClass(dateEnd: string): string {
    const n = this.daysLeft(dateEnd);
    if (n <= 0) return 'bg-red-50 text-red-700';
    if (n <= 2) return 'bg-amber-50 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  }

  today = new Date().toLocaleDateString('ar-SA-u-ca-gregory', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  go(path: string): void {
    this.router.navigate([path]);
  }

  initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join('');
  }
}
