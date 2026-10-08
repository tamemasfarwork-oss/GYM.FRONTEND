import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubServies } from '../sub.service';
import { SubEXDto } from '../../model/create-dto-sub';
import { TranslatePipe } from '@ngx-translate/core';

import { dashboardservies } from '../../dashboard/Servies/dashboard.servies';
@Component({
  selector: 'app-expired-subs',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './expired-subs.html',
  styleUrl: './expired-subs.css',
})
export class ExpiredSubs {
  private subService = inject(dashboardservies);
  subs = signal<SubEXDto[]>([]);
  search = signal('');
  loading = signal(true);
  error = signal('');

  // القائمة بعد البحث: تُحسب تلقائياً كلما تغيّر النص أو البيانات
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.subs();
    return this.subs().filter((s) => s.nameplayer.toLowerCase().includes(q));
  });

  ngOnInit() {
    this.subService.GetExpiredSubs().subscribe({
      next: (data) => {
        this.subs.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('تعذّر تحميل البيانات');
        this.loading.set(false);
      },
    });
  }

  // كم يوم مرّ على الانتهاء
  daysAgo(dateend: string): number {
    const end = new Date(dateend + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.max(0, Math.floor((today.getTime() - end.getTime()) / 86400000));
  }
}
